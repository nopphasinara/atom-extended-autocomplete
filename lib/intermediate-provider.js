'use babel';

// data source is an array of objects
import suggestions from '../data/intermediate';

class IntermediateProvider {
  constructor() {
    this.selector = '*';
    // this.selector = '.text, .text.plain, .string, .source';
    // this.disableForSelector = '.text.html.basic .comment';
    // this.inclusionPriority = 1;
    // this.suggestionPriority = 2;
    // this.excludeLowerPriority = true;
    this.filterSuggestions = true;
    this.showIcon = true;
  }

  getSuggestions(options) {
    const { prefix } = options;
    var autocompleteConfigs = atom.config.getRawValue('autocomplete-plus');

    if (prefix.length >= autocompleteConfigs.minimumWordLangth) {
      return this.findMatchingSuggestions(prefix);
    }

    // // only look for suggestions after 3 characters have been typed
    // if (prefix.length >= 3) {
    // 	return this.findMatchingSuggestions(prefix);
    // }
  }

  findMatchingSuggestions(prefix) {
    // filter list of suggestions to those matching the prefix, case insensitive
    let prefixLower = prefix.toLowerCase();
    let matchingSuggestions = suggestions.filter((suggestion) => {
      let textLower = suggestion.text.toLowerCase();
      return textLower.startsWith(prefixLower);
    });

    // run each matching suggestion through inflateSuggestion() and return
    return matchingSuggestions.map(this.inflateSuggestion);
  }

  // clones a suggestion object to a new object with some shared additions
  // cloning also fixes an issue where selecting a suggestion won't insert it
  inflateSuggestion(suggestion) {
    return {
      text: suggestion.text,
      description: suggestion.description,
      descriptionMoreURL: suggestion.descriptionMoreURL,
      type: 'value',
      rightLabel: 'Hero'
    };
  }
}
export default new IntermediateProvider();
