# E-Commerce Platform 🛒

This is my learning journey of building an e-commerce platform step by step.

###  1  
- Learned how to create a **React project setup**,- Added **React Router DOM** and understood why it is used for navigation between pages.
- - Created basic **pages** like Home, Collection, About, Contact, Product , Cart, Login, PlaceOrdered, Orders.
###  2  
-Added **Company logo** in the navbar.
- Built a **Navbar** with links for Home, Collection, About, and Contact.
- Added **Profile icon** in the navbar,Implemented a **Dropdown menu** that shows MyProfile, Orders, and Logout options when clicking the profile.
  Added a **Cart icon** with a number badge (10) near the logo.Added a **search icon** and **menu icon** in the navbar.
###  3
-**Sidebar Menu (Mobile)**          
Menu icon opens links: HOME, COLLECTION, ABOUT, CONTACT.
BACK button closes the menu.
-**Hero Section**
Banner with text on left and image on right.
-**ShopContext (Global Store)**
Stores products, currency, delivery_cost.
Provides data to all components using React Context.
-**LatestCollection Component**
Uses useContext to get products from ShopContext.

### 4
1.Created ProductItem component to show product image, name, and price.
2.Made Title component to display headings.
3.Built LatestCollection to show the 10 newest products.
4.Built BestSeller to show top 5 best-selling products.
5.Used ShopContext to get product data and currency.
6.Used React Router (Link) to go to product details page.

### 5
- Created **OurPolicy** section with icons, headings, and descriptions for exchange, return, and support policies.
- Built **NewsletterBox** component with a subscription form that prevents page refresh and takes email input.
- Developed **Footer** with company info, contact details, and copyright text.
- Styled components: added font, colors, image sizes, text alignment, list styling, and spacing.

### 6
- Fixed mobile view sizes for OurPolicy.jsx, NewsletterBox.jsx, and Footer.jsx to look proper on small screens.
- Created a responsive Collection page in React.
- Learned how to use useState and useEffect to detect screen size (mobile or desktop).
- Implemented conditional rendering — filters are always visible on desktop, but toggle on mobile.
- Improved understanding of window resizing and event listeners in React.

### 7
1. I have  loaded all products from the ShopContext.
These products contain details like name, price, category, and subCategory.
2. I keep two arrays in state:
category → stores selected categories (Men, Women, Kids)
subCategory → stores selected types (Topwear, Bottomwear, Winterwear)
3. When a checkbox is clicked, you add or remove its value in the state.
If it’s already selected → remove it
If it’s not selected → add it
This works for both category and subCategory.
4. I have used a function applyFilter() that filters products.
It creates a copy of all products and then:
If any category is selected → keep only those category items
If any type is selected → keep only those type items
Finally, the filtered list is saved in filterProducts.
5. Whenever category or subCategory changes, the filter runs again.
This is done using useEffect(() => applyFilter(), [category, subCategory]).

### 8
Added mobile-responsive CSS using @media (max-width: 767px) for better layout on small screens.
Updated the SearchBar design to adjust spacing, padding, and icon sizes on mobile.
Removed large margins and made the search bar full-width on mobile devices.
Used !important to properly override desktop CSS styles on mobile.
Updated SearchBar.jsx to show the search bar only on the Collection page.
Used useLocation + useEffect to control when the SearchBar should be visible.
Made the search input fully responsive by fixing width, font size, and alignment issues.


### 9
Developed Product page UI using React.
Implemented dynamic product data fetching with Context API.
Added image gallery with thumbnail preview.
Implemented size selection with active state styling.
Integrated Add to Cart functionality.
Styled the Product page using CSS (Flexbox layout).
Designed product image section, details, buttons, and hover effects.
Styled description & review section for better UI.

### 10
Implemented Related Products based on category & subcategory.
Styled Related Products section using CSS Grid.
Added mobile responsiveness for Product & Related pages.
Integrated Toast notifications for cart actions.
Updated ShopContext.jsx:
Implemented Add to Cart logic
(same product + same size → quantity increases,
same product + different size → new entry).
Added size validation with error toast.
Implemented cart count calculation.
Displayed cart items dynamically in Cart page using Context API.

### 11
Built the Cart page to show products added to cart
Added quantity update and delete (bin icon) functionality
Fixed cart logic so items are removed properly when quantity becomes zero
Created Cart Total section showing subtotal, delivery fee, and total amount
Implemented checkout navigation from Cart page
Designed Place Order page with delivery information form
Added payment method selection (Stripe, Razorpay, Cash on Delivery)
Highlighted the selected payment method using React state
Improved UI using CSS layout and alignment

### 12
Built Orders page with product details, order status, and track button
Implemented Login / Sign Up UI with form handling and state switching
Completed About Us page with brand description, mission, and values
Designed Why Choose Us section using card-based layout
Created Contact Us page with store address, careers info, and CTA
Added NewsletterBox integration on About and Contact pages
Implemented mobile responsiveness for all pages using media queries
Front-End Completed