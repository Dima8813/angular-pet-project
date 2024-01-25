import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
  public static banWords(bannedWords: string[] = []): ValidatorFn {
    return (
      control: AbstractControl<string | null>
    ): ValidationErrors | null => {
      const foundBannedWorld = bannedWords.find(
        world => world.toLowerCase() === control.value?.toLowerCase()
      );

      return !foundBannedWorld
        ? null
        : { banWords: { bannedWord: foundBannedWorld } };
    };
  }

  public static passportValidation(): ValidatorFn {
    return (
      control: AbstractControl<string | null>
    ): ValidationErrors | null => {
      const val = control.value;

      if (!val) {
        return null;
      }

      if (!val.toString().match(/^[A-Z]{2}[0-9]{6}$/)) {
        return { invalidPassport: true };
      }

      return null;
    };
  }
}
