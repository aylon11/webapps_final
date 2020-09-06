export const SET_USER_NAME = 'SET_USER_NAME'
interface ISetUserName {
    type: typeof SET_USER_NAME;
    payload: string;
}
export type SetUserName = ISetUserName;

