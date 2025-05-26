import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';

/**
 * Validates if the provided ID is a valid MongoDB ObjectId.
 * @param id The ID to validate.
 */
export function validateObjectId(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');
}

/**
 * Checks if a document exists in the given model by ID.
 * @param query The Mongoose query to execute
 * @param entityName The name of the entity for error messages (default: 'Document').
 */
export async function validateDocumentExists<T>(
  query: Promise<T>,
  entityName: string = 'Document',
): Promise<T> {
  const document = await query;
  if (!document) throw new NotFoundException(`${entityName} not found`);
  return document;
}

/**
 * Checks if a related document exists and throws an error if found.
 * @param model The Mongoose model to query.
 * @param filter The filter to apply to the query.
 * @param errorMessage The error message to throw if the document exists.
 */
export async function validateNoRelatedDocuments<T>(
  model: Model<T>,
  filter: object,
  errorMessage: string = 'Document has other related documents, cannot be deleted',
) {
  const exists = await model.exists(filter).exec();
  if (exists) throw new BadRequestException(errorMessage);
}
