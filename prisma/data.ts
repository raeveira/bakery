import {MenuItem} from "@/lib/types/prismaData";

const menuItems: MenuItem[] = [
    { name: 'Croissant', price: 2.50, category: 'pastries', image: '/images/croissant.jpg'},
    { name: 'Baguette', price: 3.00, category: 'bread', image: '/images/baguette.jpg'},
    { name: 'Chocolate Chip Cookie', price: 1.50, category: 'cookies', image: '/images/chocolate-chip-cookie.jpg'},
    { name: 'Sourdough Loaf', price: 5.00, category: 'bread', image: '/images/sourdough-loaf.jpg'},
    { name: 'Blueberry Muffin', price: 2.75, category: 'pastries', image: '/images/blueberry-muffin.jpg'},
    { name: 'Cinnamon Roll', price: 3.50, category: 'pastries', image: '/images/cinnamon-roll.jpg'},
    { name: 'Oatmeal Raisin Cookie', price: 1.50, category: 'cookies', image: '/images/oatmeal-raisin-cookie.jpg'},
    { name: 'Whole Wheat Bread', price: 4.50, category: 'bread', image: '/images/whole-wheat-bread.jpg'},
    { name: 'Apple Turnover', price: 3.25, category: 'pastries', image: '/images/apple-turnover.jpg'},
    { name: 'Macaroon', price: 2.00, category: 'cookies', image: '/images/macaroon.jpg'},
    { name: 'Focaccia', price: 4.00, category: 'bread', image: '/images/focaccia.jpg'},
]

export default menuItems
