import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalConstants } from '../../constants/global.constants';

export interface TableConfig<T extends Record<any, any>> {
  title: string;
  modelProp: keyof T;
  computeValue?: (value: T) => string;
}

@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends { id: string }> {
  tableData = input.required<T[]>();
  tableConfig = input.required<TableConfig<T>[]>();

  emitEvent = output<{ actionType: string; item: T }>();

  actionsConfig = GlobalConstants.actionsConfig;

  public handleClick(type: string, item: T) {
    this.emitEvent.emit({ actionType: type, item: item });
  }
}
