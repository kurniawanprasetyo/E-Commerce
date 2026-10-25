import { useMemo, useState, type ReactNode } from 'react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  oldPrice?: number
  rating: string
  image: string
  tag?: string
  color: string
}

const products: Product[] = [
  { id: 1, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 79.99, oldPrice: 99.99, rating: '4.8', image: 'photo-1505740420928-5e560c06d30e', tag: '-20%', color: 'Sand' },
  { id: 2, name: 'Linen Casual Shirt', category: 'Fashion', price: 29.99, oldPrice: 39.99, rating: '4.7', image: 'photo-1598033129183-c4f50c736f10', tag: '-25%', color: 'Olive' },
  { id: 3, name: 'Minimalist Hand Wash', category: 'Beauty', price: 16.99, oldPrice: 19.99, rating: '4.9', image: 'photo-1608571423902-eed4a5ad8108', tag: '-15%', color: 'Amber' },
  { id: 4, name: 'Compact Coffee Maker', category: 'Home & Living', price: 48.99, oldPrice: 64.99, rating: '4.6', image: 'photo-1495474472287-4d71bcdd2085', tag: '-25%', color: 'Black' },
  { id: 5, name: 'Urban Travel Backpack', category: 'Fashion', price: 39.99, oldPrice: 49.99, rating: '4.8', image: 'photo-1553062407-98eeb64c6a62', tag: '-20%', color: 'Forest' },
  { id: 6, name: 'Everyday Ceramic Mug', category: 'Home & Living', price: 18.5, rating: '4.7', image: 'photo-1514228742587-6b1558fcca3d', color: 'Cream' },
  { id: 7, name: 'Classic Wrist Watch', category: 'Fashion', price: 89, rating: '4.9', image: 'photo-1524592094714-0f0654e20314', color: 'Silver' },
  { id: 8, name: 'Everyday Smart Watch', category: 'Electronics', price: 119, oldPrice: 149, rating: '4.6', image: 'photo-1523275335684-37898b6baf30', tag: '-20%', color: 'Midnight' },
]

const categories = [
  { name: 'Electronics', icon: '▣' },
  { name: 'Fashion', icon: '♧' },
  { name: 'Home & Living', icon: '⌂' },
  { name: 'Beauty', icon: '♙' },
  { name: 'Sports', icon: '◉' },
  { name: 'Toys & Kids', icon: '❋' },
  { name: 'Books', icon: '▤' },
  { name: 'Pet Supplies', icon: '♧' },
  { name: 'View All', icon: '⠿' },
]

const imageUrl = (id: string, width = 520) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

function Icon({ children }: { children: ReactNode }) {
  return <span className="icon" aria-hidden="true">{children}</span>
}

export default function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Categories')
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showCart, setShowCart] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredProducts = useMemo(
    () => products.filter((product) =>
      (activeCategory === 'All Categories' || activeCategory === 'View All' || product.category === activeCategory) &&
      product.name.toLowerCase().includes(query.toLowerCase()),
    ),
    [activeCategory, query],
  )
  const cartProducts = cart.map((id) => products.find((product) => product.id === id)!).filter(Boolean)
  const total = cartProducts.reduce((sum, product) => sum + product.price, 0)

  const notify = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2400)
  }
  const addToCart = (product: Product) => {
    setCart((previous) => [...previous, product.id])
    notify(`${product.name} added to your bag`)
  }
  const toggleWishlist = (id: number) => {
    setWishlist((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id])
  }

  return (
    <div className="site-shell">
      <div className="announcement">Thoughtful finds for everyday living <span>•</span> Free shipping on orders over $40</div>
      <header className="header container">
        <a className="brand" href="#top" aria-label="VIVA home"><span className="brand-mark">♧</span><span><b>VIVA</b><small>LIVE BETTER</small></span></a>
        <form className="search" onSubmit={(event) => { event.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>
          <input aria-label="Search products" placeholder="Search products and more..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <button aria-label="Search" type="submit"><Icon>⌕</Icon></button>
        </form>
        <div className="header-actions">
          <button className="header-action" onClick={() => notify('Account sign-in will be available soon')}><Icon>♙</Icon><span>Account</span></button>
          <button className="header-action" onClick={() => notify(wishlist.length ? `${wishlist.length} saved item(s)` : 'Your wishlist is empty')}><span className="action-icon"><Icon>♡</Icon>{wishlist.length > 0 && <i>{wishlist.length}</i>}</span><span>Wishlist</span></button>
          <button className="header-action" aria-label="Cart" onClick={() => setShowCart(true)}><span className="action-icon"><Icon>▣</Icon>{cart.length > 0 && <i>{cart.length}</i>}</span><span>Cart</span></button>
        </div>
      </header>
      <nav className="nav container" aria-label="Main navigation">
        <button className="category-menu" onClick={() => { setActiveCategory('All Categories'); document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }) }}>☰ <span>All Categories</span></button>
        {['Home', 'Shop', 'Deals', 'New arrivals', 'Brands', 'Inspiration', 'Track Order'].map((item, index) =>
          <a key={item} className={index === 0 ? 'nav-active' : ''} href={index === 2 ? '#products' : index === 3 ? '#collections' : index === 5 ? '#stories' : '#products'}>{item}</a>
        )}
      </nav>

      <main id="top" className="container">
        <section className="hero" aria-label="Seasonal promotion">
          <img className="hero-image" src={imageUrl('photo-1616486338812-3dadae4b4ace', 1500)} alt="Warm, natural modern home interior" />
          <div className="hero-overlay" />
          <div className="hero-copy"><p className="eyebrow">THE EVERYDAY EDIT</p><h1>Elevate Your<br />Everyday</h1><p>Discover quality products across every<br className="desktop-only" /> category, made for the way you live.</p><a className="button button-dark" href="#products">Shop Now <span>↗</span></a><div className="trust-row"><span>♧ <small>Thoughtfully<br />made</small></span><span>◇ <small>Great finds<br />every day</small></span><span>♡ <small>Trusted by<br />thousands</small></span></div></div>
          <div className="sale-badge"><span>SUMMER</span><b>SALE</b><strong>UP TO<br /><em>40%</em></strong><small>OFF SELECT STYLES</small></div>
          <div className="hero-dots"><i className="active" /><i /><i /></div>
        </section>

        <section className="category-strip" id="categories" aria-label="Shop by category">
          {categories.map((category) => <button key={category.name} className={`category-tile ${activeCategory === category.name ? 'selected' : ''}`} onClick={() => { setActiveCategory(category.name === 'View All' ? 'All Categories' : category.name); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}><span className="category-icon">{category.icon}</span><span>{category.name}</span></button>)}
        </section>

        <section className="product-section" id="products">
          <div className="section-heading"><div><p className="eyebrow">A FEW GOOD THINGS</p><h2>{activeCategory === 'All Categories' ? 'Top Picks For You' : activeCategory} <span className="heart">♥</span></h2></div><a href="#products" onClick={(event) => { event.preventDefault(); setActiveCategory('All Categories'); setQuery('') }}>See All Deals <span>→</span></a></div>
          {query && <p className="search-result">Showing results for “{query}” <button onClick={() => setQuery('')}>Clear</button></p>}
          <div className="product-grid">
            {filteredProducts.length ? filteredProducts.slice(0, 5).map((product) => <article className="product-card" key={product.id}>
              {product.tag && <span className="discount">{product.tag}</span>}
              <button className={`wishlist-button ${wishlist.includes(product.id) ? 'saved' : ''}`} aria-label={`${wishlist.includes(product.id) ? 'Remove' : 'Add'} ${product.name} ${wishlist.includes(product.id) ? 'from' : 'to'} wishlist`} onClick={() => toggleWishlist(product.id)}>{wishlist.includes(product.id) ? '♥' : '♡'}</button>
              <button className="product-image-button" onClick={() => addToCart(product)} aria-label={`Quick add ${product.name}`}><img src={imageUrl(product.image)} alt={product.name} loading="lazy" /></button>
              <div className="product-info"><p className="product-category">{product.category} <span>· {product.color}</span></p><h3>{product.name}</h3><div className="rating"><span>★★★★★</span><small>{product.rating}</small></div><div className="product-bottom"><div><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><button className="add-button" aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)}>+</button></div></div>
            </article>) : <div className="empty-results">No products found. Try another search or category.</div>}
          </div>
        </section>

        <section className="collections" id="collections">
          <a className="collection-card collection-green" href="#products" onClick={() => { setActiveCategory('Fashion'); setQuery('') }}><img src={imageUrl('photo-1548036328-c9fa89d128fa', 700)} alt="Everyday handbag" loading="lazy" /><div><span>New arrivals</span><h3>Fresh Styles<br />Just In</h3><b>Shop Now ↗</b></div></a>
          <a className="collection-card collection-cream" href="#products" onClick={() => { setActiveCategory('Home & Living'); setQuery('') }}><img src={imageUrl('photo-1616486338812-3dadae4b4ace', 700)} alt="Warm living room" loading="lazy" /><div><span>Make room for</span><h3>Make Your<br />Space Better</h3><b>Shop Now ↗</b></div></a>
          <a className="collection-card collection-blue" href="#products" onClick={() => { setActiveCategory('Electronics'); setQuery('') }}><img src={imageUrl('photo-1523275335684-37898b6baf30', 700)} alt="Everyday watch" loading="lazy" /><div><span>Tech essentials</span><h3>Upgrade Your<br />Lifestyle</h3><b>Shop Now ↗</b></div></a>
        </section>

        <section className="reviews" id="stories">
          <div className="review-heading"><div><p className="eyebrow">KIND WORDS, REAL PEOPLE</p><h2>Loved By Thousands <span className="heart">♥</span></h2></div><div className="average"><b>4.8/5 Average Rating</b><span>★★★★★</span></div></div>
          <div className="review-grid">{[
            { name: 'Sarah J.', job: 'Verified buyer', img: 'photo-1494790108377-be9c29b29330', text: 'Everything arrived just as described. The quality and little details make shopping here feel special.' },
            { name: 'Michael T.', job: 'Repeat customer', img: 'photo-1500648767791-00dcc994a43e', text: 'Great products, easy checkout, and customer service that actually cares. I keep coming back.' },
            { name: 'Priya K.', job: 'Verified buyer', img: 'photo-1534528741775-53994a69daeb', text: 'I love how thoughtfully the items are chosen. It feels easy to find something useful and beautiful.' },
          ].map((review) => <article className="review-card" key={review.name}><img src={imageUrl(review.img, 100)} alt="" loading="lazy" /><div><b>{review.name} <span className="verified">✓</span></b><small>{review.job}</small><span className="review-stars">★★★★★</span><p>{review.text}</p></div></article>)}</div>
        </section>

        <section className="newsletter"><div className="mail-icon">✉</div><div className="newsletter-copy"><h2>Stay in the Loop</h2><p>Get early access, new finds, and little<br /> things worth opening your inbox for.</p></div><form onSubmit={(event) => { event.preventDefault(); if (email.includes('@')) setSubscribed(true) }}><div className="email-field"><input type="email" required aria-label="Email address" placeholder="Enter your email address" value={email} onChange={(event) => { setEmail(event.target.value); setSubscribed(false) }} /><button type="submit">Subscribe</button></div><small role="status">{subscribed ? 'Thanks for subscribing. You’re on the list!' : 'By subscribing, you agree to our Privacy Policy.'}</small></form></section>
        <section className="benefits">{[{ icon: '♧', title: 'Free Shipping', sub: 'On orders over $40' }, { icon: '◉', title: 'Easy Returns', sub: '30-day return policy' }, { icon: '♙', title: 'Secure Payments', sub: 'Demo checkout only' }, { icon: '☏', title: '24/7 Support', sub: 'We’re here to help' }].map((benefit) => <div className="benefit" key={benefit.title}><span>{benefit.icon}</span><div><b>{benefit.title}</b><small>{benefit.sub}</small></div></div>)}</section>
      </main>

      <footer className="footer"><div className="footer-main container"><div className="footer-brand"><a className="brand brand-light" href="#top"><span className="brand-mark">♧</span><span><b>VIVA</b><small>LIVE BETTER</small></span></a><p>Good things for the everyday.<br />Thoughtfully picked, made to be lived in.</p><div className="socials"><a href="#stories" aria-label="Instagram">◎</a><a href="#stories" aria-label="Pinterest">℘</a><a href="#stories" aria-label="Facebook">f</a></div></div>{[{ title: 'Shop', links: ['All Categories', 'New Arrivals', 'Best Sellers', 'Sale'] }, { title: 'Customer Care', links: ['Contact Us', 'Shipping & Returns', 'FAQs', 'Track Order'] }, { title: 'Discover', links: ['Our Story', 'Journal', 'Sustainability', 'Careers'] }].map((column) => <div className="footer-col" key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <a href={link === 'Sale' || link === 'Best Sellers' ? '#products' : '#top'} key={link}>{link}</a>)}</div>)}<div className="footer-app"><h3>Good things, on the go</h3><p>Shop your everyday favorites wherever life takes you.</p><span className="app-badge">▣ <span>Download on the<br /><b>App Store</b></span></span><span className="app-badge">▷ <span>GET IT ON<br /><b>Google Play</b></span></span></div></div><div className="footer-bottom container"><span>© 2026 VIVA. Made for everyday living.</span><div><a href="#top">Privacy Policy</a><a href="#top">Terms of Service</a><a href="#top">Accessibility</a></div><span className="country">United States　⌄</span></div></footer>
      {notice && <div role="status" className="toast">{notice}</div>}
      {showCart && <div className="drawer-backdrop" onClick={() => setShowCart(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping cart"><div className="drawer-head"><div><p className="eyebrow">YOUR EVERYDAY FINDS</p><h2>Your Bag <span>({cart.length})</span></h2></div><button aria-label="Close cart" onClick={() => setShowCart(false)}>×</button></div>{cartProducts.length ? <><div className="cart-items">{cartProducts.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={imageUrl(product.image, 180)} alt="" /><div><b>{product.name}</b><small>{product.color}</small><strong>{money(product.price)}</strong></div><button aria-label={`Remove ${product.name}`} onClick={() => setCart((previous) => { const next = [...previous]; next.splice(index, 1); return next })}>×</button></div>)}</div><div className="cart-total"><div><span>Subtotal</span><b>{money(total)}</b></div><small>Shipping and taxes calculated at checkout.</small><button onClick={() => { notify('Checkout is a demo and is not connected to payment processing.'); setShowCart(false) }} className="button button-dark">Continue to Checkout ↗</button></div></> : <div className="cart-empty"><span>♧</span><h3>Your bag is taking a little break.</h3><p>Find something good for your everyday.</p><button className="button button-dark" onClick={() => setShowCart(false)}>Continue Shopping</button></div>}</aside></div>}
    </div>
  )
}
