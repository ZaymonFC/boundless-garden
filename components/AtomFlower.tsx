export default function AtomFlower(props: { small?: boolean | undefined }) {
  return (
    <svg
      width={props.small ? 48 : 114}
      height={props.small ? 48 : 178}
      viewBox={props.small ? "0, 0, 124, 124" : undefined}
      scale={props.small ? "50%" : 0}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx={57.392}
        cy={57.5}
        rx={22.392}
        ry={54.5}
        stroke="url(#prefix__paint0_radial)"
        strokeWidth={3}
      />
      <path
        d="M26.5 177.5c0-7.518.323-14.32.882-20.5M57 58c-4 22-14.868 42.5-18.5 52-3.28 8.58-7.198 19.468-9.643 35m-1.475 12c9.54-7 28.818-22.1 29.618-26.5M27.382 157c.388-4.288.89-8.277 1.475-12m0 0c-5.786-5.833-17.557-18.8-18.357-24"
        stroke="#000"
        strokeWidth={5}
      />
      <ellipse
        cx={57.5}
        cy={57.608}
        rx={22.392}
        ry={54.5}
        transform="rotate(-90 57.5 57.608)"
        stroke="url(#prefix__paint1_radial)"
        strokeWidth={3}
      />
      <ellipse
        cx={57.37}
        cy={57.704}
        rx={22.392}
        ry={54.5}
        transform="rotate(-45 57.37 57.704)"
        stroke="url(#prefix__paint2_radial)"
        strokeWidth={3}
      />
      <ellipse
        cx={57.296}
        cy={57.37}
        rx={22.392}
        ry={54.5}
        transform="rotate(45 57.296 57.37)"
        stroke="url(#prefix__paint3_radial)"
        strokeWidth={3}
      />
      <circle cx={57} cy={58} r={6} fill="#E16565" />
      <circle cx={57} cy={133} r={4} fill="#E16565" />
      <circle cx={11} cy={123} r={4} fill="#E16565" />
      <defs>
        <radialGradient
          id="prefix__paint0_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 147.5 -60.6008 0 57.357 -21)"
        >
          <stop stopColor="#FFF500" />
          <stop offset={1} stopColor="#4F00F7" />
        </radialGradient>
        <radialGradient
          id="prefix__paint1_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 186.5 -76.624 0 58 -47.426)"
        >
          <stop stopColor="#00D1FF" />
          <stop offset={1} stopColor="red" />
        </radialGradient>
        <radialGradient
          id="prefix__paint2_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(89.222 41.738 14.761) scale(156.285 64.2101)"
        >
          <stop stopColor="#00FF85" />
          <stop offset={1} stopColor="#8F00FF" />
        </radialGradient>
        <radialGradient
          id="prefix__paint3_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3.88924 211.7783 -87.00973 1.5979 55.857 -44.428)"
        >
          <stop stopColor="#FF3D00" />
          <stop offset={1} stopColor="#0057FF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
