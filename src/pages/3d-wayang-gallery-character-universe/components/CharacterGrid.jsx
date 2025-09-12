import React, { useState, useMemo } from "react";
import CharacterCard from "./CharacterCard";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const CharacterGrid = ({
  characters,
  filters,
  selectedCharacter,
  onCharacterSelect,
  viewMode,
  sortBy,
  onClearFilters,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = viewMode === "grid" ? 12 : 8;

  // Filter and sort characters
  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = [...characters];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(
        (character) =>
          character?.name?.toLowerCase()?.includes(searchTerm) ||
          character?.description?.toLowerCase()?.includes(searchTerm) ||
          character?.origins?.some((origin) =>
            origin?.toLowerCase()?.includes(searchTerm)
          )
      );
    }

    // Apply type filter
    if (filters?.types?.length) {
      filtered = filtered?.filter((character) =>
        filters?.types?.includes(character?.type)
      );
    }

    // Apply origin filter
    if (filters?.origins?.length) {
      filtered = filtered?.filter((character) =>
        character?.origins?.some((origin) =>
          filters?.origins?.includes(origin?.toLowerCase()?.replace(" ", ""))
        )
      );
    }

    // Apply theme filter
    if (filters?.themes?.length) {
      filtered = filtered?.filter((character) =>
        character?.themes?.some((theme) => filters?.themes?.includes(theme))
      );
    }

    // Apply popularity filter
    if (filters?.minPopularity) {
      filtered = filtered?.filter(
        (character) => character?.popularity >= filters?.minPopularity
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case "popularity":
        filtered?.sort((a, b) => b?.popularity - a?.popularity);
        break;
      case "stories":
        filtered?.sort((a, b) => b?.storyCount - a?.storyCount);
        break;
      case "newest":
        filtered?.sort((a, b) => (b?.isNew ? 1 : 0) - (a?.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [characters, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedCharacters?.length / charactersPerPage
  );
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const currentCharacters = filteredAndSortedCharacters?.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButton = (page, isActive = false) => (
    <Button
      key={page}
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={() => handlePageChange(page)}
      className={`w-10 h-10 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400"
          : "bg-amber-900/30 border-amber-600/40 text-amber-200 hover:bg-amber-800/40 hover:text-amber-100"
      }`}
    >
      {page}
    </Button>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages?.push(renderPaginationButton(i, i === currentPage));
      }
    } else {
      // Always show first page
      pages?.push(renderPaginationButton(1, currentPage === 1));

      if (currentPage > 3) {
        pages?.push(
          <span key="ellipsis1" className="px-2 text-amber-400/60">
            •••
          </span>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages?.push(renderPaginationButton(i, i === currentPage));
      }

      if (currentPage < totalPages - 2) {
        pages?.push(
          <span key="ellipsis2" className="px-2 text-amber-400/60">
            •••
          </span>
        );
      }

      // Always show last page
      pages?.push(
        renderPaginationButton(totalPages, currentPage === totalPages)
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center space-x-2 mt-8"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-lg bg-amber-900/30 border-amber-600/40 text-amber-200 hover:bg-amber-800/40 hover:text-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>

        {pages}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-lg bg-amber-900/30 border-amber-600/40 text-amber-200 hover:bg-amber-800/40 hover:text-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </motion.div>
    );
  };

  if (filteredAndSortedCharacters?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-28 h-28 bg-amber-900/30 rounded-full flex items-center justify-center mb-6 border border-amber-600/30">
          <Icon name="Search" size={36} className="text-amber-400/60" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-amber-100 mb-3">
          Tidak ada karakter ditemukan
        </h3>
        <p className="text-amber-300/80 mb-8 max-w-md text-base leading-relaxed">
          Kami tidak dapat menemukan karakter yang sesuai dengan filter Anda
          saat ini. Coba sesuaikan kriteria pencarian atau hapus beberapa filter
          untuk melihat lebih banyak karakter wayang.
        </p>
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="bg-amber-900/40 border-amber-600/40 text-amber-200 hover:bg-amber-800/40 hover:text-amber-100 rounded-xl px-6 py-3"
        >
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Reset Filter
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between p-4 bg-amber-900/20 rounded-xl border border-amber-700/30 backdrop-blur-sm"
      >
        <div className="text-sm text-amber-300/80 font-medium">
          Menampilkan{" "}
          <span className="text-amber-300 font-semibold">{startIndex + 1}</span>
          -
          <span className="text-amber-300 font-semibold">
            {Math.min(endIndex, filteredAndSortedCharacters?.length)}
          </span>{" "}
          dari{" "}
          <span className="text-amber-300 font-semibold">
            {filteredAndSortedCharacters?.length}
          </span>{" "}
          Karakter
        </div>
        <div className="text-sm text-amber-300/80 font-medium">
          Halaman{" "}
          <span className="text-amber-300 font-semibold">{currentPage}</span>{" "}
          dari{" "}
          <span className="text-amber-300 font-semibold">{totalPages}</span>
        </div>
      </motion.div>

      {/* Character Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {currentCharacters?.map((character, index) => (
            <motion.div
              key={character?.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              layout
            >
              <CharacterCard
                character={character}
                onSelect={onCharacterSelect}
                isSelected={selectedCharacter?.id === character?.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {renderPagination()}

      {/* Load More Button for Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="md:hidden mt-8 text-center"
      >
        {currentPage < totalPages && (
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-full py-4 bg-amber-900/30 border-amber-600/40 text-amber-200 hover:bg-amber-800/40 hover:text-amber-100 rounded-xl"
          >
            <Icon name="Plus" size={18} className="mr-2" />
            Muat Lebih Banyak Karakter
          </Button>
        )}
      </motion.div>

      {/* Scroll to Top Button */}
      {currentPage > 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <Button
            variant="default"
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/30 hover:bg-amber-400"
          >
            <Icon name="ArrowUp" size={20} />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CharacterGrid;
