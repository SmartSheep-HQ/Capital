import { SnLoginCheckpoint } from '@/components/auth/SnLoginCheckpoint'
import { SnLoginRouter } from '@/components/auth/SnLoginRouter'
import { SnLoginStart } from '@/components/auth/SnLoginStart'
import { SnAuthFactor, SnAuthTicket } from '@/services/auth'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
  const [period, setPeriod] = useState<number>(0)
  const [ticket, setTicket] = useState<SnAuthTicket | null>(null)
  const [factorList, setFactorList] = useState<SnAuthFactor[]>([])
  const [factor, setFactor] = useState<SnAuthFactor | null>(null)

  const router = useRouter()

  function renderForm() {
    switch (period) {
      case 1:
        return (
          <SnLoginRouter
            ticket={ticket!}
            factorList={factorList}
            onNext={(val) => {
              setPeriod(period + 1)
              setFactor(val)
            }}
          />
        )
      case 2:
        return (
          <SnLoginCheckpoint
            ticket={ticket!}
            factor={factor!}
            onNext={(val, done) => {
              if (!done) {
                setTicket(val)
                setPeriod(1)
                return
              }
              router.push('/')
            }}
          />
        )
      default:
        return (
          <SnLoginStart
            onNext={(val, fcs) => {
              setPeriod(period + 1)
              setTicket(val)
              setFactorList(fcs)
            }}
          />
        )
    }
  }

  return (
    <Container
      sx={{
        display: 'grid',
        placeItems: 'center',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        <Typography variant="subtitle2" component="h2">
          Login via Solarpass
        </Typography>

        <Box sx={{ mt: 3 }}>{renderForm()}</Box>
      </Box>
    </Container>
  )
}
