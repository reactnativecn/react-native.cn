A performant interface for rendering sectioned lists, supporting the most handy features:

- Fully cross-platform.
- Configurable viewability callbacks.
- List header support.
- List footer support.
- Item separator support.
- Section header support.
- Section separator support.
- Heterogeneous data and item rendering support.
- Pull to Refresh.
- Scroll loading.


If you don't need section support and want a simpler interface, use [`<FlatList>`](flatlist.html).

If you need sticky section header support, use [`ListView`](listview.html) for now.

简单的例子：

```javascript
<SectionList
  renderItem={({item}) => <ListItem title={item.title}}
  renderSectionHeader={({section}) => <H1 title={section.key} />}
  sections={[ // 不同section渲染相同类型的子组件
    {data: [...], key: ...},
    {data: [...], key: ...},
    {data: [...], key: ...},
  ]}
/>

<SectionList
  sections={[ // 不同section渲染不同类型的子组件
    {data: [...], key: ..., renderItem: ...},
    {data: [...], key: ..., renderItem: ...},
    {data: [...], key: ..., renderItem: ...},
  ]}
/>
```

This is a convenience wrapper around [<VirtualizedList>](virtualizedlist.html), and thus inherits the following caveats:

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- In order to constrain memory and enable smooth scrolling, content is rendered asynchronously offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see blank content. This is a tradeoff that can be adjusted to suit the needs of each application, and we are working on improving it behind the scenes.
- By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop.


### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="itemseparatorcomponent"></a>ItemSeparatorComponent?:
        <span class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                             href="#itemseparatorcomponent">#</a>
    </h4>
        <div><p>Rendered in between adjacent Items within each section.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listfootercomponent"></a>ListFooterComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listfootercomponent">#</a>
    </h4>
        <div><p>Rendered at the very end of the list.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listheadercomponent"></a>ListHeaderComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listheadercomponent">#</a>
    </h4>
        <div><p>Rendered at the very beginning of the list.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="sectionseparatorcomponent"></a>SectionSeparatorComponent?:
        <span class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                             href="#sectionseparatorcomponent">#</a>
    </h4>
        <div><p>Rendered in between each section.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span
            class="propType"><code>(item: Item, index: number) =&gt; string</code></span> <a class="hash-link"
                                                                                             href="#keyextractor">#</a>
    </h4>
        <div><p>Used to extract a unique key for a given item at the specified index. Key is used for caching
            and as the react key to track item re-ordering. The default extractor checks item.key, then
            falls back to using the index, like react does.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached?: <span
            class="propType"><code>?(info: {distanceFromEnd: number}) =&gt; void</code></span> <a class="hash-link"
                                                                                                  href="#onendreached">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh?: <span
            class="propType"><code>?() =&gt; void</code></span> <a class="hash-link"
                                                                   href="#onrefresh">#</a></h4>
        <div><p>If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
            sure to also set the <code>refreshing</code> prop correctly.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onviewableitemschanged"></a>onViewableItemsChanged?:
        <span class="propType"><code>?(info: {viewableItems: Array&lt;ViewToken&gt;, changed: Array&lt;ViewToken&gt;}) =&gt; void</code></span>
        <a class="hash-link" href="#onviewableitemschanged">#</a></h4>
        <div><p>Called when the viewability of rows changes, as defined by the
            <code>viewabilityConfig</code> prop.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#refreshing">#</a></h4>
        <div><p>Set this true while waiting for new data from a refresh.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderitem"></a>renderItem: <span
            class="propType"><code>(info: {item: Item, index: number}) =&gt; ?React.Element&lt;any&gt;</code></span> <a
            class="hash-link" href="#renderitem">#</a></h4>
        <div><p>Default renderer for every item in every section. Can be over-ridden on a per-section basis.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="rendersectionheader"></a>renderSectionHeader?: <span
            class="propType"><code>?(info: {section: SectionT}) =&gt; ?React.Element&lt;any&gt;</code></span> <a
            class="hash-link" href="#rendersectionheader">#</a></h4>
        <div><p>Rendered at the top of each section. Sticky headers are not yet supported.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="sections"></a>sections: <span
            class="propType"><code>Array&lt;SectionT&gt;</code></span> <a class="hash-link"
                                                                          href="#sections">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="shoulditemupdate"></a>shouldItemUpdate: <span
            class="propType"><code>(
  prevProps: {item: Item, index: number},
  nextProps: {item: Item, index: number}
) =&gt; boolean</code></span> <a class="hash-link" href="#shoulditemupdate">#</a></h4>
        <div><p>This is an optional optimization to minimize re-rendering items.</p></div>
    </div>
</div>

### 例子

```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  SectionList,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const UIExplorerPage = require('./UIExplorerPage');

const infoLog = require('infoLog');

const {
  HeaderComponent,
  FooterComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  genItemData,
  pressItem,
  renderSmallSwitchOption,
  renderStackedItem,
} = require('./ListExampleShared');

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

const renderSectionHeader = ({section}) => (
  <View>
    <Text style={styles.headerText}>SECTION HEADER: {section.key}</Text>
    <SeparatorComponent />
  </View>
);

const CustomSeparatorComponent = ({text}) => (
  <View>
    <SeparatorComponent />
    <Text style={styles.separatorText}>{text}</Text>
    <SeparatorComponent />
  </View>
);

class SectionListExample extends React.PureComponent {
  static title = '<SectionList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(1000),
    filterText: '',
    logViewable: false,
    virtualized: true,
  };
  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (filterRegex.test(item.text) || filterRegex.test(item.title));
    const filteredData = this.state.data.filter(filter);
    return (
      <UIExplorerPage
        noSpacer={true}
        noScroll={true}>
        <View style={styles.searchRow}>
          <PlainInput
            onChangeText={filterText => {
              this.setState(() => ({filterText}));
            }}
            placeholder="Search..."
            value={this.state.filterText}
          />
          <View style={styles.optionSection}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'logViewable')}
          </View>
        </View>
        <SeparatorComponent />
        <SectionList
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          SectionSeparatorComponent={() => <CustomSeparatorComponent text="SECTION SEPARATOR" />}
          ItemSeparatorComponent={() => <CustomSeparatorComponent text="ITEM SEPARATOR" />}
          enableVirtualization={this.state.virtualized}
          onRefresh={() => alert('onRefresh: nothing to refresh :P')}
          onViewableItemsChanged={this._onViewableItemsChanged}
          refreshing={false}
          renderItem={this._renderItemComponent}
          renderSectionHeader={renderSectionHeader}
          sections={[
            {renderItem: renderStackedItem, key: 's1', data: [
              {title: 'Item In Header Section', text: 'Section s1', key: '0'},
            ]},
            {key: 's2', data: [
              {noImage: true, title: 'First item', text: 'Section s2', key: '0'},
              {noImage: true, title: 'Second item', text: 'Section s2', key: '1'},
            ]},
            {key: 'Filtered Items', data: filteredData},
          ]}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </UIExplorerPage>
    );
  }
  _renderItemComponent = ({item}) => <ItemComponent item={item} onPress={this._pressItem} />;
  // This is called when items change viewability by scrolling into our out of the viewable area.
  _onViewableItemsChanged = (info: {
    changed: Array<{
      key: string, isViewable: boolean, item: {columns: Array<*>}, index: ?number, section?: any
    }>},
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog('onViewableItemsChanged: ', info.changed.map((v: Object) => (
        {...v, item: '...', section: v.section.key}
      )));
    }
  };
  _pressItem = (index: number) => {
    pressItem(this, index);
  };
}

const styles = StyleSheet.create({
  headerText: {
    padding: 4,
  },
  optionSection: {
    flexDirection: 'row',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
  separatorText: {
    color: 'gray',
    alignSelf: 'center',
    padding: 4,
    fontSize: 9,
  },
});

module.exports = SectionListExample;
```
