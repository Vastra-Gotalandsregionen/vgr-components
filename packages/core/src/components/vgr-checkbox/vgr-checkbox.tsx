import { Component, Element, Event, EventEmitter, Host, Listen, Prop, State, h } from '@stencil/core';
import { check, chevronDown } from '../../assets/svgs.generated';

let idCount = 0;

@Component({
  tag: 'vgr-checkbox',
  scoped: true,
})
export class VgrCheckbox {
  private readonly checkboxId = `vgr-checkbox-${idCount++}`;
  private readonly reasonId = `${this.checkboxId}-reason`;
  private readonly childrenId = `${this.checkboxId}-children`;
  private inputEl?: HTMLInputElement;

  private isChild = false;
  private isLastInList = false;
  private isCollapsible = false;

  @Element() el!: HTMLElement;

  @Prop() label!: string;
  @Prop() name?: string;
  @Prop() value?: string;
  @Prop() disabled = false;
  @Prop() srOnlyDisabledReason?: string;
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop({ mutable: true }) indeterminate: boolean = false;

  @State() hasChildren = false;
  @State() expanded = false;

  @Event() vgrChange: EventEmitter<{ value?: string; checked: boolean }>;

  componentWillLoad() {
    this.isChild = !!this.el.parentElement?.closest('vgr-checkbox');
    this.isCollapsible = !!this.el.closest('vgr-leveled-multiselect-filter');
    this.hasChildren = this.getDirectChildren().length > 0;

    this.isLastInList = true;
    let node: HTMLElement = this.el;
    while (node.parentElement?.closest('vgr-checkbox')) {
      for (let sibling = node.nextElementSibling; sibling; sibling = sibling.nextElementSibling) {
        if (sibling.tagName === 'VGR-CHECKBOX') this.isLastInList = false;
      }
      node = node.parentElement.closest('vgr-checkbox') as HTMLElement;
    }
  }

  componentDidLoad() {
    if (this.hasChildren) this.syncFromChildren();
  }

  componentDidRender() {
    if (this.inputEl) this.inputEl.indeterminate = this.indeterminate;
  }

  @Listen('vgrChange')
  handleChildChange(event: Event) {
    const target = event.target as HTMLElement;
    if (target === this.el) return;
    if (target.parentElement?.closest('vgr-checkbox') !== this.el) return;
    this.syncFromChildren();
  }

  private getDirectChildren(): HTMLVgrCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('vgr-checkbox')).filter(child => child.parentElement?.closest('vgr-checkbox') === this.el);
  }

  private syncFromChildren() {
    const children = this.getDirectChildren();
    const all = children.every(child => child.checked);
    const some = children.some(child => child.checked || child.indeterminate);
    const checked = all;
    const indeterminate = !all && some;
    if (checked === this.checked && indeterminate === this.indeterminate) return;
    this.checked = checked;
    this.indeterminate = indeterminate;
    this.vgrChange.emit({ value: this.value, checked: this.checked });
  }

  private setAllDescendants(checked: boolean) {
    this.el.querySelectorAll('vgr-checkbox').forEach(child => {
      child.checked = checked;
      child.indeterminate = false;
    });
  }

  private readonly handleChange = () => {
    this.checked = this.inputEl.checked;
    this.indeterminate = false;
    if (this.hasChildren) this.setAllDescendants(this.checked);
    this.vgrChange.emit({ value: this.value, checked: this.checked });
  };

  private readonly handleClick = (event: MouseEvent) => {
    if (this.disabled) event.preventDefault();
  };

  private readonly toggleExpanded = () => {
    this.expanded = !this.expanded;
  };

  render() {
    const hasReason = this.disabled && !!this.srOnlyDisabledReason;
    const showToggle = this.hasChildren && this.isCollapsible;
    const childrenHidden = this.isCollapsible && !this.expanded;
    const hasBg = this.isCollapsible && (this.isChild || this.expanded);
    const showBottomRound = this.isLastInList && !(this.hasChildren && this.expanded);

    const rowClasses = [
      'flex items-center justify-between gap-1',
      hasBg ? 'bg-primary-base-surface-minimal' : '',
      hasBg && !this.isChild ? 'rounded-t-checkbox-bg' : '',
      hasBg && showBottomRound ? 'rounded-b-checkbox-bg' : '',
    ].join(' ');

    const labelClasses = [
      'flex items-center gap-2 text-base leading-6',
      this.isCollapsible ? 'p-3' : '',
      this.isChild && !this.isCollapsible ? 'py-1.5' : '',
      this.isChild && this.isCollapsible ? 'pl-6' : '',
      this.disabled ? 'text-neutral-disabled cursor-not-allowed' : 'text-neutral-text cursor-pointer',
    ].join(' ');

    const isFull = this.checked && !this.indeterminate;
    const strokeClass = this.disabled ? 'stroke-neutral-disabled' : this.checked || this.indeterminate ? 'stroke-primary-action' : 'stroke-neutral-text';
    const fillClass = this.disabled ? 'fill-neutral-disabled' : 'fill-primary-action';

    const boxClasses = [
      'grid shrink-0 place-items-center w-6 h-6 rounded-xs',
      'peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-primary-base-30',
    ].join(' ');

    return (
      <Host class="block">
        <div class={rowClasses}>
          <label htmlFor={this.checkboxId} class={labelClasses}>
            <input
              type="checkbox"
              class="peer sr-only"
              id={this.checkboxId}
              name={this.name}
              value={this.value}
              checked={this.checked}
              onChange={this.handleChange}
              onClick={this.handleClick}
              ref={el => (this.inputEl = el)}
              aria-disabled={this.disabled ? 'true' : undefined}
              aria-describedby={hasReason ? this.reasonId : undefined}
            />
            <span class={boxClasses} aria-hidden="true">
              <svg class="col-start-1 row-start-1 w-6 h-6" viewBox="0 0 24 24">
                {isFull ? (
                  <rect x="0" y="0" width="24" height="24" rx="4" class={fillClass} />
                ) : (
                  <rect x="1" y="1" width="22" height="22" rx="3" fill="none" stroke-width="2" class={strokeClass} />
                )}
                {this.indeterminate && <rect x="5" y="5" width="14" height="14" rx="1" class={fillClass} />}
              </svg>
              {isFull && <vgr-icon icon={check} class="col-start-1 row-start-1 text-white mt-px" size={2.5}></vgr-icon>}
            </span>
            {this.label}
          </label>
          {showToggle && (
            <button
              type="button"
              class="flex size-8 shrink-0 items-center justify-center text-neutral-text cursor-pointer pr-3"
              aria-expanded={this.expanded ? 'true' : 'false'}
              aria-controls={this.childrenId}
              aria-label={`Undernivåer för ${this.label}`}
              onClick={this.toggleExpanded}
            >
              <vgr-icon icon={chevronDown} class={this.expanded ? 'rotate-180' : ''} size={3}></vgr-icon>
            </button>
          )}
        </div>
        {hasReason && (
          <span id={this.reasonId} class="sr-only">
            {this.srOnlyDisabledReason}
          </span>
        )}
        <div id={this.childrenId} class={childrenHidden ? 'hidden' : this.isCollapsible ? 'ml-3' : 'ml-5'}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
