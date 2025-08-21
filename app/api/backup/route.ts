import { NextResponse } from 'next/server'

// This will store all newsletter signups as a backup
let allBackups: any[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Add timestamp and backup ID
    const backup = {
      ...data,
      backupTime: new Date().toISOString(),
      backupId: Date.now()
    }
    
    allBackups.push(backup)
    
    console.log('Data backed up:', backup)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Data backed up successfully',
      backup
    })
  } catch (error) {
    console.error('Backup failed:', error)
    return NextResponse.json(
      { success: false, message: 'Backup failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    totalBackups: allBackups.length,
    backups: allBackups
  })
}