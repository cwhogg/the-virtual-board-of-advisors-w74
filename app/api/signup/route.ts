import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()
const SITE_ID = process.env.SITE_ID || 'advisora'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Valid email address required' }, { status: 400 })
    }
    
    // Get client IP for basic tracking
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Store signup in Redis
    const signupData = {
      email,
      timestamp: new Date().toISOString(),
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown'
    }
    
    // Add to email list
    await redis.rpush(`email_signups:${SITE_ID}`, JSON.stringify(signupData))
    
    // Increment counter
    await redis.incr(`email_signups_count:${SITE_ID}`)
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}