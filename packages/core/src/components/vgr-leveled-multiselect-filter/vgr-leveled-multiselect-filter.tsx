import { Component, Element, Host, Prop, State, h } from '@stencil/core';

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
    const treeClasses = [
      'block w-fit',
      '[&_vgr-checkbox[expanded]:not(vgr-checkbox_vgr-checkbox)]:overflow-hidden',
      '[&_vgr-checkbox[expanded]:not(vgr-checkbox_vgr-checkbox)]:rounded-lg',
      '[&_vgr-checkbox[expanded]:not(vgr-checkbox_vgr-checkbox)>div:first-child]:bg-primary-base-surface-minimal',
      '[&_vgr-checkbox[expanded]_vgr-checkbox>div:first-child]:bg-primary-base-surface-minimal',
    ].join(' ');

    const showMoreButton = this.topLevelCount > this.initialVisible;

    return (
      <Host class="block">
        <div class={treeClasses}>
          <slot></slot>
        </div>
        {showMoreButton && (
          <button
            type="button"
            class="mt-2 cursor-pointer p-2 text-base font-bold text-primary-action underline"
            aria-expanded={this.showAll ? 'true' : 'false'}
            onClick={this.toggleShowAll}
          >
            {this.showAll ? 'Visa färre' : 'Visa fler'}
          </button>
        )}
      </Host>
    );
  }
}
