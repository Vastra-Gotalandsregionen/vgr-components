import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { chevronDown } from '../../assets/svgs.generated';

@Component({
  tag: 'vgr-leveled-multiselect-filter',
  scoped: true,
})
export class VgrLeveledMultiselectFilter {
  @Element() el!: HTMLElement;

  @Prop() initialVisible: number = 10;

  @State() showAll = false;
  @State() topLevelCount = 0;

  componentDidRender() {
    this.applyToCheckboxes();
  }

  private getTopLevel(): HTMLVgrCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('vgr-checkbox')).filter(checkbox => !checkbox.parentElement?.closest('vgr-checkbox'));
  }

  private applyToCheckboxes() {
    this.el.querySelectorAll('vgr-checkbox').forEach(checkbox => {
      checkbox.collapsibleChildren = true;
    });

    const topLevel = this.getTopLevel();
    topLevel.forEach((checkbox, index) => {
      checkbox.hidden = !this.showAll && index >= this.initialVisible;
    });

    if (topLevel.length !== this.topLevelCount) this.topLevelCount = topLevel.length;
  }

  private readonly toggleShowAll = () => {
    this.showAll = !this.showAll;
  };

  render() {
    const showMoreButton = this.topLevelCount > this.initialVisible;

    return (
      <Host class="block">
        <div class="block w-fit">
          <slot></slot>
        </div>
        {showMoreButton && (
          <button
            type="button"
            class="cursor-pointer p-3 text-base text-primary-action hover:underline"
            aria-expanded={this.showAll ? 'true' : 'false'}
            onClick={this.toggleShowAll}
          >
            {this.showAll ? 'Visa färre' : 'Visa fler'}
            <vgr-icon icon={chevronDown} class={`ml-2.5 ${this.showAll ? 'rotate-180' : ''}`} size={3}></vgr-icon>
          </button>
        )}
      </Host>
    );
  }
}
