import z from 'zod';
import _ from 'lodash';
import { UserManagementDataSchema, UserManagement } from './UserManagement';
import { Catalog, CatalogDataSchema, CatalogDataSchemaType } from './Catalog';

const LibraryDataSchema = z.object({
    userManagement: UserManagementDataSchema,
    catalog: CatalogDataSchema,
})

type LibraryDataSchemaType = z.infer<typeof LibraryDataSchema>

export class Library {
    static addBookItem(libraryData: LibraryDataSchemaType, userId: string, bookItemInfo: string): CatalogDataSchemaType{
        if(UserManagement.isLibrarian(libraryData.userManagement, userId)){
            return Catalog.addBookItem(libraryData.catalog, bookItemInfo)
        } else {
            throw "Not allowed to add a book item;"
        }
    }

    static searchBooksByTitleJSON(libraryData: LibraryDataSchemaType, query: string){
        const catalogData = _.get(libraryData, 'catalog');
        const results = Catalog.searchBooksByTitle(catalogData, query);
        const resultsJSON = JSON.stringify(results);

        return resultsJSON;
    }
}