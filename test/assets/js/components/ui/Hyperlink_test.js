import Hyperlink from 'components/ui/Hyperlink';

describe('Hyperlink', () => {

  it('renders plain text if no href', () => {
    const result = shallowRender(<Hyperlink>Wizard News</Hyperlink>);
    result.should.deep.equal(<span><span>Wizard News</span></span>);
  });

  it('renders a link if href is present', () => {
    const newsHref = 'https://hogwarts.example.com/news';
    const result = shallowRender(<Hyperlink href={newsHref}>Wizard News</Hyperlink>);
    result.should.deep.equal(<a href={newsHref} target="_blank">Wizard News</a>);
  })

});
