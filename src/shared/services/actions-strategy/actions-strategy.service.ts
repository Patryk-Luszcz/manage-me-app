import { Injectable } from '@angular/core';
import { ProjectsEditModalComponent } from '../../../app/authorized-user/content/projects/projects-edit-modal/projects-edit-modal.component';
import { ProjectsInfoModalComponent } from '../../../app/authorized-user/content/projects/projects-info-modal/projects-info-modal.component';
import { FunctionalitiesEditModalComponent } from '../../../app/authorized-user/content/functionalities/functionalities-edit-modal/functionalities-edit-modal.component';
import { FunctionalitiesViewModalComponent } from '../../../app/authorized-user/content/functionalities/functionalities-view-modal/functionalities-view-modal.component';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';
import { AdminEditModalComponent } from '../../../app/authorized-user/content/admin/admin-edit-modal/admin-edit-modal.component';
import { AdminViewModalComponent } from '../../../app/authorized-user/content/admin/admin-view-modal/admin-view-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ActionsStrategyService {
  public actionStrategyHandler(operationType: string) {
    const services: { [key: string]: any } = {
      INFO_PROJECT: ProjectsInfoModalComponent,
      EDIT_PROJECT: ProjectsEditModalComponent,
      ADD_PROJECT: ProjectsEditModalComponent,
      INFO_FUNCTIONALITY: FunctionalitiesViewModalComponent,
      EDIT_FUNCTIONALITY: FunctionalitiesEditModalComponent,
      ADD_FUNCTIONALITY: FunctionalitiesEditModalComponent,
      ADD_USER: AdminEditModalComponent,
      EDIT_USER: AdminEditModalComponent,
      INFO_USER: AdminViewModalComponent,
    };

    return services[operationType] ?? ConfirmationModalComponent;
  }
}
