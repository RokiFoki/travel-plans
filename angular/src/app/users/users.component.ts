import { AddNewUserDialogComponent } from './add-new-user-dialog/add-new-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../dashboard/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

export interface UserElement {
  username: string;
  role: string;
  numberOfTrips: number;
}

const ELEMENT_DATA: UserElement[] = [
  {numberOfTrips: 10, username: 'User1', role: 'Administrator'},
  {numberOfTrips: 20, username: 'User2', role: 'User Manager'},
  {numberOfTrips: 15, username: 'User3', role: 'Regular'},
  {numberOfTrips: 22, username: 'User4', role: 'Regular'}
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'role', 'numberOfTrips', 'actions'];
  dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  filterUsers(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewUserDialogComponent);

    dialogRef.afterClosed().subscribe((data: any) => {
    });
  }

  delete(user) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Do you want to delete following user?`,
        body: `Username: ${user.username}\r\n`
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }

  edit(user) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }

}
