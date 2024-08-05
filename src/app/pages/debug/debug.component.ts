import { Component, inject } from '@angular/core';
import { ExtenderSlotDirective, PLUGIN_MANAGER } from '@kompakkt/extender';
import { HelloWorldPlugin } from '@kompakkt/hello-world-plugin';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [ExtenderSlotDirective],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss',
})
export class DebugComponent {
  #pluginManager = inject(PLUGIN_MANAGER);
  #helloWorldPlugin = inject(HelloWorldPlugin.providerToken!);

  constructor() {
    console.log(this.#pluginManager);
    console.log(this.#helloWorldPlugin);
  }

  debugEvent(event: unknown) {
    console.log(event);
  }
}
