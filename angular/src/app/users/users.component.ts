import { User, UsersService } from './services/users.service';
import { AddNewUserDialogComponent } from './add-new-user-dialog/add-new-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../dashboard/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['username', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();

  private subscription: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.subscription = this.usersService.get()
      .subscribe(users => {
        this.dataSource.data = users;
      });

    this.usersService.fetch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterUsers(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewUserDialogComponent);

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
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

    dialogRef.afterClosed().subscribe((data: User) => {
      this.usersService.edit(data.getData()).subscribe();
    });
  }

}
