'use client'
import { useEffect, useState } from 'react'

const effects = [
  ['none', 'Original', '원본'], ['crt', 'CRT', 'CRT'],
  ['apertureGrille', 'Trinitron', '트리니트론'],
  ['greenPhosphor', 'Green phosphor', '녹색 형광'],
  ['amberPhosphor', 'Amber phosphor', '호박색 형광'],
  ['vhs', 'VHS', 'VHS'], ['grayscale', 'Grayscale', '흑백'],
  ['sepia', 'Sepia', '세피아'], ['blueprint', 'Blueprint', '청사진'],
  ['bloom', 'Bloom', '빛 번짐'], ['pixelate', 'Pixelate', '픽셀화'],
  ['invert', 'Invert', '색상 반전'], ['rainGlass', 'Rain on glass', '유리창 빗방울'],
  ['snowfall', 'Snowfall', '눈 내림'], ['underwater', 'Underwater', '수중']
]

export default function EffectGallery({ lang = 'en' }) {
  const ko = lang === 'ko'
  const [selected, setSelected] = useState('crt')
  const [compare, setCompare] = useState(false)
  const [reduced, setReduced] = useState(true)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const title = effects.find(e => e[0] === selected)[ko ? 2 : 1]
  const animated = ['rainGlass', 'snowfall', 'underwater'].includes(selected)
  return <section className="effect-gallery" aria-label={ko ? '화면 효과 비교' : 'Screen effect comparison'}>
    <div className="effect-options" role="group" aria-label={ko ? '효과 선택' : 'Choose an effect'}>
      {effects.map(e => <button key={e[0]} type="button" aria-pressed={selected === e[0]} onClick={() => setSelected(e[0])}>{e[ko ? 2 : 1]}</button>)}
    </div>
    <div className="effect-heading" aria-live="polite"><strong>{title}</strong></div>
    <label className="effect-compare"><input type="checkbox" checked={compare} onChange={e => setCompare(e.target.checked)} />{ko ? '원본도 함께 보기' : 'Show original alongside'}</label>
    <div className={compare ? 'effect-frames comparing' : 'effect-frames'}>
      {compare && <figure><figcaption>{ko ? '원본 · 효과 없음' : 'Original · no effect'}</figcaption><img src="/media/effects/none.webp" alt={ko ? '화면 효과 없는 예시 터미널' : 'Sample terminal without effects'} /></figure>}
      <figure><figcaption>{title}{selected !== 'none' && (ko ? ' · 강도 100%' : ' · 100% intensity')}</figcaption>
        {animated ? <video key={`${selected}-${reduced}`} controls loop muted playsInline autoPlay={!reduced} preload="metadata" poster={`/media/effects/${selected}.webp`} aria-label={ko ? `${title} 효과의 4.8초 예시` : `4.8-second ${title} example`}><source src={`/media/effects/${selected}.mp4`} type="video/mp4" /></video> : <img src={`/media/effects/${selected}.webp`} alt={ko ? `${title} 효과를 적용한 예시 터미널` : `Sample terminal with ${title} effect`} />}
      </figure>
    </div>
    <p className="effect-note">{ko ? '실제 Damson Metal 렌더러로 만든 샘플 화면입니다. 모든 효과에 동일한 텍스트를 사용했습니다. 영상은 실제 속도의 4.8초이며 반복할 때 장면이 다시 시작됩니다.' : 'Sample screens from Damson’s actual Metal renderer, using identical text for every effect. Videos run at real speed for 4.8 seconds and restart at each loop.'}</p>
  </section>
}
