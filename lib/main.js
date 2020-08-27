'use babel';

import { CompositeDisposable, Disposable, Emitter } from 'sb-event-kit';
import disposableEvent from 'disposable-event';
// Internal variables
let instance = null;
let disposables = null;

import basicProvider from './basic-provider';
import intermediateProvider from './intermediate-provider';
import advancedProvider from './advanced-provider';

export default {
  didChangeWordLength: null,
  minimumWordLangth: 3,

  activate() {
    this.emitter = new Emitter();
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(this.emitter);
  },

  deactivate() {
    this.subscriptions.dispose();
    if (this.didChangeWordLength) {
      this.didChangeWordLength.dispose();
      this.didChangeWordLength = null;
    }
  },

  getProvider() {
    // return a single provider, or an array of providers to use together
    return [basicProvider, intermediateProvider, advancedProvider];
  },
};
