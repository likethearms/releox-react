import { Translation } from '../../Translation.d';

export interface DataTableTranslations {
  DataTable: {
    noDataText: string;
    loadingText: string;
  };
}

const DataTableTranslation: Translation<DataTableTranslations> = {
  fi: {
    DataTable: {
      noDataText: 'Ei näytettäviä tietoja',
      loadingText: 'Lataa...',
    },
  },
  en: {
    DataTable: {
      noDataText: 'There is nothing to show',
      loadingText: 'Loading...',
    },
  },
};

export default DataTableTranslation;
