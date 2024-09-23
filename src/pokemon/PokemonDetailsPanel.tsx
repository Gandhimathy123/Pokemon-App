import React, { useState } from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react';

interface Item {
  key: string;
  name: string;
  value: number;
}

const PokemonDetailsPanel: React.FC = () => {
  const [items] = useState<Item[]>([
    { key: '1', name: 'Item 1', value: 10 },
    { key: '2', name: 'Item 2', value: 20 },
    { key: '3', name: 'Item 3', value: 15 },
  ]);

  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: 'column1',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      onColumnClick: (ev, column) => onColumnClick(column),
    },
    {
      key: 'column2',
      name: 'Value',
      fieldName: 'value',
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      onColumnClick: (ev, column) => onColumnClick(column),
    },
  ]);

  const [sortedItems, setSortedItems] = useState<Item[]>(items);
  const [sortDirection, setSortDirection] = useState<boolean | undefined>(undefined);
  const [sortedColumnKey, setSortedColumnKey] = useState<string | undefined>(undefined);

  const onColumnClick = (column: IColumn) => {
    const newSortDirection =  !column.isSortedDescending; 
    const newItems = sortedItems.sort((a, b) => {
      if (a[column.fieldName as keyof Item] < b[column.fieldName as keyof Item]) {
        return newSortDirection ? 1 : -1;
      }
      if (a[column.fieldName as keyof Item] > b[column.fieldName as keyof Item]) {
        return newSortDirection ? -1 : 1;
      }
      return 0;
    });

    // setSortDirection(newSortDirection);
    setSortedItems(newItems);
    // setSortedColumnKey(column.key);

    const updatedColumns = columns.map(col => {
      col.isSorted = col.key === column.key;
      col.isSortedDescending = col.key === column.key ? newSortDirection : false;
      return col;
    });

    setColumns(updatedColumns);
  };

  return (
    <DetailsList
      items={sortedItems}
      columns={columns}
      setKey="set"
      layoutMode={DetailsListLayoutMode.fixedColumns}
    />
  );
};


export default PokemonDetailsPanel;

