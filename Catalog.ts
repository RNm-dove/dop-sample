import z from 'zod';
import _ from 'lodash';

const BookDataSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  publicationYear: z.string(),
  authorsIds: z.string().array(),
});

export const CatalogDataSchema = z.object({
  authorsById: z.record(
    z.object({
      name: z.string(),
      bookIsbns: z.string().array(),
    }),
  ),
  booksByIsbn: z.record(BookDataSchema),
});

export type CatalogDataSchemaType = z.infer<typeof CatalogDataSchema>;
export type BookDataSchemaType = z.infer<typeof BookDataSchema>;

export class Catalog {
  static addBookItem(
    catalogData: CatalogDataSchemaType,
    bookItemInfo: string,
  ): CatalogDataSchemaType {
    return catalogData;
  }

  static authorNames(
    catalogData: {
      authorsById: Record<
        string,
        {
          name: string;
        }
      >;
    },
    authorIds: string[],
  ) {
    return _.map(authorIds, (authorId) =>
      _.get(catalogData, ['authorsById', authorId, 'name'], 'unknown'),
    );
  }

  static bookInfo(
    catalogData: {
      authorsById: Record<
        string,
        {
          name: string;
        }
      >;
    },
    book: BookDataSchemaType,
  ) {
    const bookInfo = {
      title: _.get(book, 'title'),
      isbn: _.get(book, 'isbn'),
      authorNames: Catalog.authorNames(catalogData, _.get(book, 'authorsIds')),
    };

    return bookInfo;
  }

  static searchBooksByTitle(catalogData: CatalogDataSchemaType, query: string) {
    const allBooks = _.get(catalogData, 'booksByIsbn');
    const matchingBooks = _.filter(allBooks, (book) =>
      _.get(book, 'title').includes(query),
    );
    const bookInfos = _.map(matchingBooks, (book) =>
      Catalog.bookInfo(catalogData, book),
    );

    return bookInfos;
  }
}
