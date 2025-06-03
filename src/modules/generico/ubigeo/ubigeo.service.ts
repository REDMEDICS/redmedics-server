import { Injectable } from '@nestjs/common';
import { CreateUbigeoDto } from './dto/create-ubigeo.dto';
import { UpdateUbigeoDto } from './dto/update-ubigeo.dto';
import { Ubigeo } from './schemas/ubigeo.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { normalizeString, toTitleCase } from 'src/common/utils/string.utils';
import { validateDocumentExists, validateObjectId } from 'src/common/utils/mongo-validation.utils';

@Injectable()
export class UbigeoService {

  constructor(
    @InjectModel(Ubigeo.name)
    private readonly ubigeoModel: Model<Ubigeo>,
  ) { }
  create(createUbigeoDto: CreateUbigeoDto) {
    return 'This action adds a new ubigeo';
  }
  async findAll({
    department = '',
    province = '',
  }: {
    department?: string;
    province?: string;
  }) {
    const filter: any = {};

    if (department) filter['department'] = department;
    if (province) filter['province'] = province;

    const pipeline: any[] = [{ $match: filter }];

    if (!department && !province) {
      pipeline.push(
        {
          $group: { _id: '$department' },
        },
        {
          $project: { _id: 0, department: '$_id' },
        },
        {
          $sort: { department: 1 },
        },
      );
    } else if (department && !province) {
      pipeline.push(
        {
          $group: { _id: '$province' },
        },
        {
          $project: { _id: 0, province: '$_id' },
        },
        {
          $sort: { province: 1 },
        },
      );
    } else {
      pipeline.push(
        {
          $project: {
            _id: 1,
            province: 1,
            district: 1,
            department: 1,
            code: 1,
          },
        },
        {
          $sort: { code: 1 },
        },
      );
    }

    return await this.ubigeoModel.aggregate(pipeline).exec();
  }

  async searchAll(query: string, limit: number) {
    const normalizedQuery = normalizeString(query);
    const searchTerms = normalizedQuery
      .split(' ')
      .filter((term) => term.trim() !== '');
    const searchConditions = searchTerms.map((term) => ({
      $or: [
        { department: { $regex: term, $options: 'i' } },
        { province: { $regex: term, $options: 'i' } },
        { district: { $regex: term, $options: 'i' } },
      ],
    }));
    const results = await this.ubigeoModel
      .find(
        { $and: searchConditions },
        { _id: 0, country: 0, status: 0, __v: 0 },
      )
      .limit(limit || 10)
      .exec();

    return results.map((item) => ({
      code: item.code,
      name: toTitleCase(item.district),
      labelSuggest: `${toTitleCase(item.district)}, ${toTitleCase(item.province)}, ${toTitleCase(item.department)}`,
    }));
  }

   async findOne(id: string) {
    validateObjectId(id);

    return validateDocumentExists(
      this.ubigeoModel.findById(id).exec(),
      'Ubigeo',
    );
  }
}
