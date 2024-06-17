import { Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface TableConfig<T extends Record<any, any>> {
  title: string;
  modelProp: keyof T;
}

@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends { id: string }> {
  tableData = input.required<T[]>();
  tableConfig = input.required<TableConfig<T>[]>();
}
