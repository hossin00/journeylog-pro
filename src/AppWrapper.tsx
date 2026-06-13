import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'
import App from './App'

const DONE_KEY = 'journeylog-pro_onboarded_v1'
type Phase = 'splash' | 'onboard' | 'app'

export default function AppWrapper() {
  const [phase, setPhase] = useState<Phase>('splash')
  const features = ["Trip journal with photos", "Packing list builder", "Expense per trip", "Offline map notes"]
  return (
    <>
      {phase === 'splash' && <SplashScreen onDone={()=>setPhase(localStorage.getItem(DONE_KEY)?'app':'onboard')} color1="#06b6d4" color2="#0891b2" emoji="✈️" name="JourneyLog Pro" tagline="Travel journal and trip planner"/>}
      {phase === 'onboard' && <Onboarding onDone={()=>{localStorage.setItem(DONE_KEY,'1');setPhase('app')}} color1="#06b6d4" emoji="✈️" name="JourneyLog Pro" features={features}/>}
      {phase === 'app' && <App/>}
    </>
  )
}