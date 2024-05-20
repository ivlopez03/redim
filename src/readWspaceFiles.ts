
import * as vscode from 'vscode';


const listOfFiles: string[] = []


async function getPathUri(ws: any){
    const uri_format = vscode.Uri.file(ws[0].uri.path.slice(1))
    return uri_format 
}

function filter_workspace(workspace_array: any[],ws_path: string,list_filtered:string[]){
        
    if (workspace_array != undefined){ 
        //filter array and getting array with the files.
        workspace_array.forEach(async element => {
            
            if(element[1] == 1){
                list_filtered.push(element[0])
                console.log('push file type 1')
            }
            else if(element[1] == 2){
                
                const folder_path = ws_path + '/' + element[0]
                const get_list = await vscode.workspace.fs.readDirectory(await get_uriFormat(folder_path))
                get_list.forEach(async element =>{
                    if(element[1] == 1){
                        list_filtered.push(element[0])
                        console.log('push file type 1.2')
                    }
                    else if(element[1] == 2){
                        const fpath = folder_path + '/' + element[0]
                        const getlist = await vscode.workspace.fs.readDirectory(await get_uriFormat(fpath))
                        console.log('push file type 2.2')
                        filter_workspace(getlist,ws_path,list_filtered)

                    }
                    
                })
            }

            }
          
        );
        console.log(list_filtered)

        return list_filtered

        console.log(list_filtered)
        console.log(list_filtered.length)
        
    }
    
}

async function get_uriFormat(path: string){
    const new_format = vscode.Uri.file(path)
    return new_format
}

// get workspace and filter path and transform to Uri
export async function getWorkspace(){
    const ws_folder = vscode.workspace.workspaceFolders 

    if (ws_folder != undefined){
        const ws_path =ws_folder[0].uri.path.slice(1)
        const workspace_array = await vscode.workspace.fs.readDirectory(await getPathUri(ws_folder))
        let result = filter_workspace(workspace_array,ws_path,listOfFiles)
        console.log('result:',result)
        return result

    } 
}

//export async function getAllFiles(){ 

//    const result = await getWorkspace()
//    console.log('this is the result:', result)
//    return listOfFiles

//}





