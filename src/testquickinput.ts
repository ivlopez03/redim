import { QuickPickItem, window, Disposable, CancellationToken, QuickInputButton, QuickInput, ExtensionContext, QuickInputButtons, Uri } from 'vscode';
import { getWorkspace } from './readWspaceFiles';
import * as vscode from 'vscode';


/**
 * A multi-step input using window.createQuickPick() and window.createInputBox().
 * This first part uses the helper class `MultiStepInput` that wraps the API for the multi-step case.
 */

export async function optimizedSelectedFile(context: ExtensionContext) {

	/**
	 * A class MyButton that implements QuickInputButton
	 * This class is used to create a constructor of the button that will be used to open a input to add a path file
	 * In the properties of the constructor, add the path of the icon that will be used for the button   
	 */
	class MyButton implements QuickInputButton {
		constructor(public iconPath: { light: Uri; dark: Uri; }, public tooltip: string) { }
	}

	const createAddPathButton = new MyButton({
		dark: Uri.file(context.asAbsolutePath('resources/dark/add.svg')),
		light: Uri.file(context.asAbsolutePath('resources/light/add.svg')),
	}, 'Add a path file');


	/**
	 * Defining the QuickPickItem array for the files, quality and file extensions available for the user
	 * For the files array, it will be filled with the files in the workspace by calling the function getWorkspace() 
	 * For the quality array, it will be filled with the quality options that the user can choose
	 * For the fileExtensions array, it will be filled with the file extensions that the user can choose
	 */

    const arrayOfAllFiles = await getWorkspace();
	const files: QuickPickItem[] = arrayOfAllFiles
		.map((label) => ({ label }));

	const qualityList: QuickPickItem[] = ['90', '80', '70', '60', '50', '40', '30', '20', '10']
		.map(label => ({ label }));

	const fileExtensions: QuickPickItem[] = ['Webp', 'AVIF']
		.map(label => ({ label }));

	//Defining the State interface for the input steps
	interface State {
		title: string;
		step: number;
		totalSteps: number;
		filename: QuickPickItem | string;
		quality: QuickPickItem;
		name: string;
		fileExtension: QuickPickItem;
	}

	
	async function collectInputs() {
		const state = {} as Partial<State>;
		await MultiStepInput.run(input => pickFile(input, state));
		return state as State;
	}

	const title = 'Optimize File';

	/**
	 * The pickFile function is the first step of the input.
	 * @param input  - param to call the showQuickPick method to create a QuickPick window 
	 * @param state  - param to define the state properties
	 * @returns  inputFilePath function if the user clicks on the button to add a path file or inputQuality function if the user selects a file
	 */

	async function pickFile(input: MultiStepInput, state: Partial<State>) {
		const pick = await input.showQuickPick({
			title,
			step: 1,
			totalSteps: 3,
			placeholder: 'Select a file to optimize',
			items: files,
			activeItem: typeof state.filename !== 'string' ? state.filename : undefined,
			buttons: [createAddPathButton],
			shouldResume: shouldResume
		});
		if (pick instanceof MyButton) {
			return (input: MultiStepInput) => inputFilePath(input, state);
		}
		state.filename = pick;
		return (input: MultiStepInput) => inputQuality(input, state);
	}


	/**
	 * The inputFilePath function is the second step of the input.
	 * @param input  - param to call the showInputBox method to create a InputBox window 
	 * @param state  - param to define the state properties
	 * @returns  inputQuality function
	 */

	async function inputFilePath(input: MultiStepInput, state: Partial<State>) {
		state.filename = await input.showInputBox({
			title,
			step: 2,
			totalSteps: 4,
			value: typeof state.filename === 'string' ? state.filename : '',
			prompt: 'Paste the path of the file to optimize',
			validate: validateFileExist,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => inputQuality(input, state);
	}

	/**
	 * The inputQuality function is the third step of the input.
	 * @param input  - param to call the showQuickPick method to create a QuickPick window 
	 * @param state  - param to define the state properties
	 * @returns  pickFormat function
	 */

	async function inputQuality(input: MultiStepInput, state: Partial<State>) {
		const additionalSteps = typeof state.filename === 'string' ? 1 : 0;
		// TODO: Remember current value when navigating back.
		const quality = await input.showQuickPick({
			title,
			step: 2 + additionalSteps,
			totalSteps: 3 + additionalSteps,
			value: state.name || '',
			placeholder: 'Choose a quality % for the image optimization',
			items: qualityList,
			activeItem: typeof state.quality !== 'string' ? state.quality : undefined,
			shouldResume: shouldResume
		});
		state.quality = quality;
		return (input: MultiStepInput) => pickFormat(input, state);
	}

	/**
	 * The pickFormat function is the fourth step of the input.
	 * @param input  - param to call the showQuickPick method to create a QuickPick window 
	 * @param state  - param to define the state properties
	 * @returns  void
	 */

	async function pickFormat(input: MultiStepInput, state: Partial<State>) {
		const additionalSteps = typeof state.filename === 'string' ? 1 : 0;
		// TODO: Remember currently active item when navigating back.
		state.fileExtension = await input.showQuickPick({
			title,
			step: 3 + additionalSteps,
			totalSteps: 3 + additionalSteps,
			placeholder: 'Select your preferred file format for downloading the image',
			items: fileExtensions,
			activeItem: state.quality,
			shouldResume: shouldResume
		});
	};



	//---------------------------------------------- in progress
	function shouldResume() {
		// Could show a notification with the option to resume.
		return new Promise<boolean>((resolve, reject) => {
			// noop
		});
	}
	//----------------------------------------------



	/**
	 * The validateFileExist function is used to validate if the file already exists.
	 * @param file  - file param is the file path that the user will input
	 * @returns  'file does not exist' if the file is  undefined 
	 */

	async function validateFileExist(file: string) {
		// ...validate...
		await new Promise(resolve => setTimeout(resolve, 1000));
		return file === 'vscode' ? 'Name not unique' : undefined;
	}



	const state = await collectInputs();
	const filename = Object.values(state.filename)[0];
	console.log(state);
	window.showInformationMessage(`Downloading optimized image '${filename}'`);
}



// -------------------------------------------------------
// Helper code that wraps the API for the multi-step case.
// -------------------------------------------------------


class InputFlowAction {
	static back = new InputFlowAction();
	static cancel = new InputFlowAction();
	static resume = new InputFlowAction();
}

type InputStep = (input: MultiStepInput) => Thenable<InputStep | void>;

interface QuickPickParameters<T extends QuickPickItem> {
	title: string;
	step: number;
	totalSteps: number;
	items: T[];
	activeItem?: T;
	ignoreFocusOut?: boolean;
	placeholder: string;
	buttons?: QuickInputButton[];
	shouldResume: () => Thenable<boolean>;
}

interface InputBoxParameters {
	title: string;
	step: number;
	totalSteps: number;
	value: string;
	prompt: string;
	validate: (value: string) => Promise<string | undefined>;
	buttons?: QuickInputButton[];
	ignoreFocusOut?: boolean;
	placeholder?: string;
	shouldResume: () => Thenable<boolean>;
}

class MultiStepInput {

	static async run<T>(start: InputStep) {
		const input = new MultiStepInput();
		return input.stepThrough(start);
	}

	private current?: QuickInput;
	private steps: InputStep[] = [];

	private async stepThrough<T>(start: InputStep) {
		let step: InputStep | void = start;
		while (step) {
			this.steps.push(step);
			if (this.current) {
				this.current.enabled = false;
				this.current.busy = true;
			}
			try {
				step = await step(this);
			} catch (err) {
				if (err === InputFlowAction.back) {
					this.steps.pop();
					step = this.steps.pop();
				} else if (err === InputFlowAction.resume) {
					step = this.steps.pop();
				} else if (err === InputFlowAction.cancel) {
					step = undefined;
				} else {
					throw err;
				}
			}
		}
		if (this.current) {
			this.current.dispose();
		}
	}

	async showQuickPick<T extends QuickPickItem, P extends QuickPickParameters<T>>({ title, step, totalSteps, items, activeItem, ignoreFocusOut, placeholder, buttons, shouldResume }: P) {
		const disposables: Disposable[] = [];
		try {
			return await new Promise<T | (P extends { buttons: (infer I)[] } ? I : never)>((resolve, reject) => {
				const input = window.createQuickPick<T>();
				input.title = title;
				input.step = step;
				input.totalSteps = totalSteps;
				input.ignoreFocusOut = ignoreFocusOut ?? false;
				input.placeholder = placeholder;
				input.items = items;
				if (activeItem) {
					input.activeItems = [activeItem];
				}
				input.buttons = [
					...(this.steps.length > 1 ? [QuickInputButtons.Back] : []),
					...(buttons || [])
				];
				disposables.push(
					input.onDidTriggerButton(item => {
						if (item === QuickInputButtons.Back) {
							reject(InputFlowAction.back);
						} else {
							resolve(<any>item);
						}
					}),
					input.onDidChangeSelection(items => resolve(items[0])),
					input.onDidHide(() => {
						(async () => {
							reject(shouldResume && await shouldResume() ? InputFlowAction.resume : InputFlowAction.cancel);
						})()
							.catch(reject);
					})
				);
				if (this.current) {
					this.current.dispose();
				}
				this.current = input;
				this.current.show();
			});
		} finally {
			disposables.forEach(d => d.dispose());
		}
	}

	async showInputBox<P extends InputBoxParameters>({ title, step, totalSteps, value, prompt, validate, buttons, ignoreFocusOut, placeholder, shouldResume }: P) {
		const disposables: Disposable[] = [];
		try {
			return await new Promise<string | (P extends { buttons: (infer I)[] } ? I : never)>((resolve, reject) => {
				const input = window.createInputBox();
				input.title = title;
				input.step = step;
				input.totalSteps = totalSteps;
				input.value = value || '';
				input.prompt = prompt;
				input.ignoreFocusOut = ignoreFocusOut ?? false;
				input.placeholder = placeholder;
				input.buttons = [
					...(this.steps.length > 1 ? [QuickInputButtons.Back] : []),
					...(buttons || [])
				];
				let validating = validate('');
				disposables.push(
					input.onDidTriggerButton(item => {
						if (item === QuickInputButtons.Back) {
							reject(InputFlowAction.back);
						} else {
							resolve(<any>item);
						}
					}),
					input.onDidAccept(async () => {
						const value = input.value;
						input.enabled = false;
						input.busy = true;
						if (!(await validate(value))) {
							resolve(value);
						}
						input.enabled = true;
						input.busy = false;
					}),
					input.onDidChangeValue(async text => {
						const current = validate(text);
						validating = current;
						const validationMessage = await current;
						if (current === validating) {
							input.validationMessage = validationMessage;
						}
					}),
					input.onDidHide(() => {
						(async () => {
							reject(shouldResume && await shouldResume() ? InputFlowAction.resume : InputFlowAction.cancel);
						})()
							.catch(reject);
					})
				);
				if (this.current) {
					this.current.dispose();
				}
				this.current = input;
				this.current.show();
			});
		} finally {
			disposables.forEach(d => d.dispose());
		}
	}
}

