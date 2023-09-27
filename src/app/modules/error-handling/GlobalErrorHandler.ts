import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any[]) {
    // Aquí puedes personalizar la lógica para manejar el error
    const code = error;
    console.error('error #%d', code);
    // Prints: error #5, to stderr
    console.error('error', code);
    // Prints: error 5, to stderr
    console.error('Ocurrió un error:', code);
    // Otras acciones que desees realizar
  }
}
