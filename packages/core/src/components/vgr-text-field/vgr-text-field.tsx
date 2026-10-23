import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'vgr-text-field',
  shadow: true,
})
export class VgrTextField {
  @Prop() type: 'text' | 'textarea' | 'number' | 'email' | 'password' | 'tel' | 'url' = 'text';
  @Prop() disabled = false;
  @Prop() value: string | number;
  @Prop() label!: string;
  @Prop() helperText?: string;
  @Prop() placeholder?: string;
  @Prop() error?: string;

  render() {
    return <Host>{this.type === 'textarea' ? <textarea /> : <input type={this.type} />}</Host>;
  }
}
