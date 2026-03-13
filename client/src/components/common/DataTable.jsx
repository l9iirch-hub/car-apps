import React from "react";
import {
  ChevronDown,
  Search,
  MoreVertical,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DataTable = ({
  columns,
  data = [],
  loading = false,
  onRowClick,
  actions,
  searchPlaceholder = "Search...",
  emptyState = "No data available",
  className = "",
}) => {
  const [search, setSearch] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      columns.some((col) =>
        row[col.key]?.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search, columns]);

  if (loading) {
    return (
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 text-textMuted mb-8">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl animate-pulse"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-48" />
                <div className="h-3 bg-white/5 rounded w-32" />
              </div>
              <div className="w-24 h-10 bg-white/10 rounded-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-white/5">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
              />
            </div>
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-white/80 uppercase tracking-wider first:rounded-tl-xl last:rounded-tr-xl"
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-right text-sm font-semibold text-white/80 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence>
              {filteredData.map((row, index) => (
                <motion.tr
                  key={row._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-white/5 transition-colors group"
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-5 text-sm text-white/90 first:font-medium max-w-[200px] truncate"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-textMuted hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <AlertCircle className="w-16 h-16 text-textMuted mx-auto mb-6 opacity-50" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {emptyState}
          </h3>
          <p className="text-textMuted">
            Try adjusting your search or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DataTable;
