import { useEffect, useState } from 'react'
import { getCategories, getProducts } from '../services/api'
import CategoryPanel from '../components/CategoryPanel'
import TrendingSlider from '../components/TrendingSlider'
import HeroSlider from '../components/HeroSlider'

export default function HomePage() {
    const [cats, setCats] = useState([])
    const [trending, setTrending] = useState([])

    useEffect(() => {
        (async () => {
            const c = await getCategories()
            setCats(c)
            const p = await getProducts({})
            setTrending(p.slice(0, 18)) // more items for auto slider
        })()
    }, [])

    // Pick 6 popular cats for the first two rows
    const primary = ['electronics', 'home-living', 'beauty-health', 'groceries-food', 'sports-outdoors', 'automobile-tools']
    const firstRow = cats.filter(c => primary.includes(c.id)).slice(0, 3)
    const secondRow = cats.filter(c => primary.includes(c.id)).slice(3, 6)
    // Optional extra row with fashion/pets/music if you want more on the homepage
    const extras = cats.filter(c => ['men', 'women', 'kids-baby', 'pet-supplies', 'music'].includes(c.id))

    return (
        <div className="container" style={{ paddingTop: 16 }}>
            <HeroSlider />

            <div className="grid cols-3">
                {firstRow.map(c => <CategoryPanel key={c.id} category={c} />)}
            </div>

            <TrendingSlider items={trending} />

            <div className="grid cols-3">
                {secondRow.map(c => <CategoryPanel key={c.id} category={c} />)}
            </div>

            {extras.length > 0 && (
                <div className="grid cols-3" style={{ marginTop: 16 }}>
                    {extras.slice(0, 3).map(c => <CategoryPanel key={c.id} category={c} />)}
                </div>
            )}
        </div>
    )
}
