param(
  [string]$Source = "public/assets/logo/happyreelslogoyellow.png",
  [string]$BrownDestination = "public/assets/logo/happyreelslogobrown.png",
  [string]$LightDestination = "public/assets/logo/happyreelslogolight.png"
)

Add-Type -AssemblyName System.Drawing

$sourcePath = (Resolve-Path -LiteralPath $Source).Path
$cocoa = @{ R = 58; G = 36; B = 28 }
$gold = @{ R = 244; G = 178; B = 62 }

function New-LogoVariant {
  param(
    [string]$Destination,
    [bool]$RecolorWhite
  )

  $destinationDirectory = (Resolve-Path -LiteralPath (Split-Path -Parent $Destination)).Path
  $destinationPath = Join-Path $destinationDirectory (Split-Path -Leaf $Destination)
  $bitmap = [System.Drawing.Bitmap]::FromFile($sourcePath)
  $output = New-Object System.Drawing.Bitmap(
    $bitmap.Width,
    $bitmap.Height,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )
  $graphics = [System.Drawing.Graphics]::FromImage($output)
  $graphics.DrawImageUnscaled($bitmap, 0, 0)
  $graphics.Dispose()
  $bitmap.Dispose()

  $rectangle = New-Object System.Drawing.Rectangle(0, 0, $output.Width, $output.Height)
  $bitmapData = $output.LockBits(
    $rectangle,
    [System.Drawing.Imaging.ImageLockMode]::ReadWrite,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )

  try {
    $byteCount = [Math]::Abs($bitmapData.Stride) * $output.Height
    $pixels = New-Object byte[] $byteCount
    [System.Runtime.InteropServices.Marshal]::Copy($bitmapData.Scan0, $pixels, 0, $byteCount)

    for ($index = 0; $index -lt $pixels.Length; $index += 4) {
      $blue = $pixels[$index]
      $green = $pixels[$index + 1]
      $red = $pixels[$index + 2]
      $alpha = $pixels[$index + 3]
      $range = [Math]::Max($red, [Math]::Max($green, $blue)) - [Math]::Min($red, [Math]::Min($green, $blue))

      $isYellowAccent =
        $alpha -gt 0 -and
        $red -gt 145 -and
        $green -gt 85 -and
        $blue -lt 170 -and
        ($red - $blue) -gt 55 -and
        ($green - $blue) -gt 12
      $isWhiteMark =
        $alpha -gt 0 -and
        $red -gt 185 -and
        $green -gt 185 -and
        $blue -gt 185 -and
        $range -lt 55

      if ($isYellowAccent) {
        $pixels[$index] = $cocoa.B
        $pixels[$index + 1] = $cocoa.G
        $pixels[$index + 2] = $cocoa.R
      }
      elseif ($RecolorWhite -and $isWhiteMark) {
        $pixels[$index] = $gold.B
        $pixels[$index + 1] = $gold.G
        $pixels[$index + 2] = $gold.R
      }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($pixels, 0, $bitmapData.Scan0, $byteCount)
  }
  finally {
    $output.UnlockBits($bitmapData)
  }

  $output.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $output.Dispose()
  Write-Output "Created $destinationPath"
}

New-LogoVariant -Destination $BrownDestination -RecolorWhite $false
New-LogoVariant -Destination $LightDestination -RecolorWhite $true
