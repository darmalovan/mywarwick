import AgendaTile from 'components/tiles/AgendaTile';
import { AgendaTileItem } from 'components/tiles/AgendaTile';

describe('AgendaTile', () => {

  const props = {
    "content": {
      "items": [{ id: '1' }, { id: '2' }, { id: '3' }]
    },
    size: 'large',
  };

  it('Displays a limited number of items when not zoomed', () => {
    const html = shallowRender(<AgendaTile { ...props } maxItemsToDisplay={ 1 }/>);
    html.props.children.length.should.equal(1);
  });

  it('Displays all items when zoomed', () => {
    const html = shallowRender(<AgendaTile
      maxItemsToDisplay={ 1 }
      zoomed={ true }
      { ...props }
    />);
    html.props.children.length.should.equal(3);
  });

});

describe('AgendaTileItem', () => {
  const props = {
    start: '2014-08-04T17:00:00',
    end: '2014-08-04T18:00:00',
    title: 'Heron hunting',
    location: 'Heronbank',
    onClick: sinon.spy()
  };

  it('renders correctly without a href', () => {
    const html = shallowRender(<AgendaTileItem zoomed={ true } { ...props } />);
    html.type.should.equal('div');
    html.props.className.should.equal('tile-list-item');
    const a = html.props.children;
    const [ date, title ] = a.props.children;
    const titleInner = title.props.children[0],
      dateInner = date.props.children;
    titleInner.props.className.should.equal(
      'tile-list-item__title text--align-bottom text--dotted-underline'
    );
    titleInner.props.title.should.equal(props.title);
    titleInner.props.children.should.equal(props.title);
    dateInner.should.equal('17:00');
  });

  it('renders with a href. clicking it calls the onClick prop', () => {
    const tileItem = <AgendaTileItem zoomed={ true } href={ 'href' } { ...props } />;
    const html = shallowRender(tileItem);
    const a = html.props.children;
    a.props.href.should.equal('href');
    a.props.children.type.should.equal('div');

    const node = ReactTestUtils.renderIntoDocument(tileItem);
    ReactTestUtils.Simulate.click(node);
    props.onClick.should.have.been.called;
  });


  it('renders time for all-day events', () => {
    const html = shallowRender(<AgendaTileItem zoomed={ true } { ...props } end={ undefined }/>);
    const a = html.props.children;
    const [ date , ] = a.props.children;
    date.props.children.should.equal('all-day');
  });

  it('renders location text', () => {
    const html = shallowRender(<AgendaTileItem zoomed={ true } { ...props } />);
    const locationInner = html.props.children
      .props.children[1].props.children[2];
    locationInner.props.className.should.equal(
      'tile-list-item__location text--align-bottom text--light'
    );
    locationInner.props.children.should.equal('Heronbank');
  })

});
