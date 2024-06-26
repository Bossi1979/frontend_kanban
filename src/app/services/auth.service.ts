import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Signup } from '../models/signup.model';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rememberStatus: boolean = false;


  constructor(private http: HttpClient) { }


  /**
   * Logs in with email and password.
   * 
   * @param email The user's email address.
   * @param password The user's password.
   * @returns A Promise that resolves with the login response.
   */
  public async loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    const url = environment.baseUrl + "/login/";
    const body = {
      "email": email.toLowerCase(),
      "password": password,
    };
    return lastValueFrom(this.http.post(url, body));
  }


  /**
   * Logs out the user by sending a GET request to the logout endpoint.
   * 
   * @returns {Promise<any>} A promise that resolves with the result of the logout request.
   */
  public async logout(): Promise<any> {
    const url = environment.baseUrl + "/logout/";
    return lastValueFrom(this.http.get(url));
  }


  /**
   * Signs up a new user by sending a POST request to the register endpoint.
   * 
   * @param {Signup} signupData - The signup data to be sent in the request body.
   * @returns {Promise<any>} A promise that resolves with the result of the signup request.
   */
  public async signup(signupData: Signup): Promise<any> {
    const url = environment.baseUrl + "/register/";
    const body = signupData.createSignupObject();
    return lastValueFrom(this.http.post(url, body));
  }


  /**
   * Retrieves all contacts by sending a GET request to the contacts endpoint.
   * 
   * @returns {Promise<any>} A promise that resolves with the result of the get all contacts request.
   */
  public async getAllContacts(): Promise<any> {
    const url = environment.baseUrl + "/contacts/";
    return lastValueFrom(this.http.get(url));
  }


  /**
   * Retrieves all tasks.
   * 
   * @returns A Promise that resolves with the response containing all tasks.
   */
  public async getAllTasks(): Promise<any> {
    const url = environment.baseUrl + "/add_task/";
    return lastValueFrom(this.http.get(url));
  }


  /**
   * Adds a new contact by sending a POST request to the add contact endpoint.
   * 
   * @param {Contact} newContact - The new contact object to be added.
   * @returns {Promise<any>} A promise that resolves with the result of the add new contact request.
   */
  public async addNewContact(newContact: Contact): Promise<any> {
    const url = environment.baseUrl + "/contacts/";
    const body = newContact.createContactObject();
    return lastValueFrom(this.http.post(url, body));
  }


  /**
   * Asynchronously deletes a contact with the specified ID.
   * 
   * @param {number} contactId - The ID of the contact to be deleted.
   * @returns {Promise<any>} A promise that resolves with the result of the delete operation.
   */
  public async deleteContact(contactId: number): Promise<any> {
    const url = `${environment.baseUrl}/contacts/${contactId}`;
    return lastValueFrom(this.http.delete(url));
  }


  /**
   * Asynchronously updates a contact with the provided data.
   * 
   * @param {Contact} toEditContact - The contact object containing the updated data.
   * @returns {Promise<any>} A promise that resolves with the result of the edit operation.
   */
  public async editContact(toEditContact: Contact): Promise<any> {
    const url = environment.baseUrl + "/contacts/";
    const body = toEditContact.createContactObject();
    return lastValueFrom(this.http.patch(url, body));
  }


  /**
   * Saves a task by sending a POST request to the add task endpoint.
   * 
   * @param {any[]} task - The task data to be saved.
   * @returns {Promise<any>} A promise that resolves with the result of the save task request.
   */
  public async saveTask(task: any[]): Promise<any> {
    const url = environment.baseUrl + "/add_task/";
    return lastValueFrom(this.http.post(url, task));
  }


  /**
   * Updates a task.
   * 
   * @param task The task object to update.
   * @returns A Promise that resolves with the response of the update operation.
   */
  public async updateTask(task: Task): Promise<any> {
    const url = environment.baseUrl + "/add_task/";
    const body = task.createTaskObject();
    return lastValueFrom(this.http.patch(url, body));
  }


  /**
   * Deletes a task by ID.
   * 
   * @param taskId The ID of the task to delete.
   * @returns A Promise that resolves with the response of the delete operation.
   */
  public async deleteTask(taskId: number): Promise<any> {
    const url = `${environment.baseUrl}/add_task/${taskId}`;
    return lastValueFrom(this.http.delete(url));
  }
}
