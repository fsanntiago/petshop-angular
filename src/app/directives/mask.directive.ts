import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[mask]", // <input [mask]="###.###"
})
export class MaskDirective {
  @Input("mask") mask: string; // da 'match com o nome do directive e pegar oque esta passando para esse directive'

  constructor(private element: ElementRef) {} // retorna o <input>

  // ouvir oque o elemento que esta usando a diretiva esta fazendo
  @HostListener("input", ["$event"]) onInputChange(event) {
    if (event.inputType == "deleteContentBackward") return; // se apertou o backspace

    const initialValue = this.element.nativeElement.value;
    initialValue.replace(/[^0-9]*/g, "");
    if (initialValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }

    this.element.nativeElement.value = this.format(this.mask, initialValue);
  }

  format(mask: string, value: any): string {
    let text = "";
    let data = value;
    let c, m, i, x;

    for (i = 0, x = 1; x && i < mask.length; ++i) {
      c = data.charAt(i);
      m = mask.charAt(i);

      switch (mask.charAt(i)) {
        case "#":
          if (/\d/.test(c)) {
            text += c;
          } else {
            x = 0;
          }
          break;

        case "A":
          if (/[a-z]/i.test(c)) {
            text += c;
          } else {
            x = 0;
          }
          break;

        case "N":
          if (/[a-z0-9]/i.test(c)) {
            text += c;
          } else {
            x = 0;
          }
          break;

        case "X":
          text += c;
          break;

        default:
          text += m;
          break;
      }
    }
    return text;
  }
}
