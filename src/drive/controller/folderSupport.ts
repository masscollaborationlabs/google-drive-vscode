import { DriveModel } from "../model/driveModel";
import { IDriveView } from "../view/driveView";
import { IControllerSupport } from "./controllerSupport";

export class FolderSupport implements IControllerSupport {

    fireCommand(model: DriveModel, view: IDriveView, fileId: string): void {
        view.showInputBox('Please type the folder name')
            .then((folderName) => {
                if (folderName) {
                    const createFolderPromise = this.createFolderPromise(model, view, fileId, folderName);
                    view.showProgressMessage(`Creating folder '${folderName}' on Google Drive. Please wait...`, createFolderPromise);
                } else {
                    view.showWarningMessage(`'Create folder' process canceled by user.`);
                }
            });
    }

    private createFolderPromise(model: DriveModel, view: IDriveView, fileId: string, folderName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            model.createFolder(fileId, folderName)
                .then(_files => {
                    view.showInformationMessage(`Folder '${folderName}' successfully created on Drive.`);
                    view.refresh();
                    resolve();
                })
                .catch(err => {
                    view.showWarningMessage(err);
                    reject(err);
                })
        });
    }

}