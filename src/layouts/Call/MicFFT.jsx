import { cn } from "utils";
import { motion } from "framer-motion";
import { AutoSizer } from "react-virtualized";
import PropTypes from "prop-types";
export default function MicFFT({ fft, className }) {
  return (
    <div className={"size-full relative"}>
      <AutoSizer>
        {({ width, height }) => (
          <motion.svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className={cn("!size-full absolute !inset-0", className)}
          >
            {Array.from({ length: 24 }).map((_, index) => {
              const value = (fft[index] ?? 0) / 4;
              const h = Math.min(Math.max(height * value, 2), height);
              const yOffset = height * 0.5 - h * 0.5;

              return (
                <motion.rect
                  key={`mic-fft-${index}`}
                  height={h}
                  width={2}
                  x={2 + (index * width - 4) / 24}
                  y={yOffset}
                  rx={4}
                />
              );
            })}
          </motion.svg>
        )}
      </AutoSizer>
    </div>
  );
}
MicFFT.propTypes = {
  fft: PropTypes.any.isRequired, // Validate 'fft' prop
  className: PropTypes.string.isRequired, // Validate 'className' prop
};
