import React from 'react'
import { Svg } from './styles'
import { Link } from '@reach/router'

export const Logo = props => (
  <Link to='/'>
    <svg
      width={476.918}
      height={96.819}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="11.541 26.591 476.918 96.819"
      style={{
        background: "0 0",
      }}
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <defs>
        <filter id="prefix__editing-vr">
          <feFlood floodColor="#d56b34" floodOpacity={0.7} result="c1" />
          <feFlood floodColor="#20778c" floodOpacity={0.7} result="c3" />
          <feComposite
            operator="in"
            in="c1"
            in2="SourceAlpha"
            result="text-c1"
          />
          <feComposite
            operator="in"
            in="c3"
            in2="SourceAlpha"
            result="text-c3"
          />
          <feOffset in="text-c1" dx={-3} dy={1} result="text1" />
          <feOffset in="text-c3" dx={3} dy={-1} result="text3" />
          <feBlend
            in="SourceGraphic"
            in2="text1"
            mode="multiply"
            result="text4"
          />
          <feBlend in="text4" in2="text3" mode="multiply" />
        </filter>
      </defs>
      <g filter="url(#prefix__editing-vr)">
        <path
          d="M103 60.555v7h7v7h-7v21H89v-35h14zm7 0h21v7h-21v-7zm77 35h-42v-7h14v-35h-7v-7h21v42h14v7zm49 0h-35v-7h-7v-7h14v7h21v-14h-28v-7h-7v-14h7v-7h35v7h7v7h-14v-7h-21v14h28v7h7v14h-7v7zm28 0h-14v-49h14v14h28v7h7v28h-14v-28h-21v28zm84 0h-35v-7h-7v-21h7v-7h35v7h7v21h-7v7zm-28-28v21h21v-21h-21zm56 35h-14v-42h42v7h7v14h-7v7h-28v14zm0-35v14h21v-14h-21z"
          fill="#020547"
        />
      </g>
      <style />
    </svg>
  </Link>
)