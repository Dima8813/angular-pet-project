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
        : { banWords: { banWord: foundBannedWorld } };
    };
  }
}
