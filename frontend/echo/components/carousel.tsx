'use client'

import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from '@/components/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import '@/app/embla.css'

import { Portfolio } from '@/types/types'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

interface CarouselProps {
  portfolios: Portfolio[];
}


const Carousel: React.FC<CarouselProps> = ({ portfolios }) => (
  <>
    <EmblaCarousel portfolios={portfolios} options={OPTIONS} />
  </>
)

export default Carousel