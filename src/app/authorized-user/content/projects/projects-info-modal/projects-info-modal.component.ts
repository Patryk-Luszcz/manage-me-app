import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-projects-info-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './projects-info-modal.component.html',
  styleUrl: './projects-info-modal.component.scss',
})
export class ProjectsInfoModalComponent {
  modalData = inject(MAT_DIALOG_DATA);

  confirm(){
    
  }
}
