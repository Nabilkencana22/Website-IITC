import React, { useState, useMemo } from 'react';
import CharacterCard from './CharacterCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CharacterGrid = ({ characters, filters, selectedCharacter, onCharacterSelect, viewMode, sortBy }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = viewMode === 'grid' ? 12 : 8;

  // Filter and sort characters
  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = [...characters];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(character =>
        character?.name?.toLowerCase()?.includes(searchTerm) ||
        character?.description?.toLowerCase()?.includes(searchTerm) ||
        character?.origins?.some(origin => origin?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Apply type filter
    if (filters?.types?.length) {
      filtered = filtered?.filter(character =>
        filters?.types?.includes(character?.type)
      );
    }

    // Apply origin filter
    if (filters?.origins?.length) {
      filtered = filtered?.filter(character =>
        character?.origins?.some(origin => filters?.origins?.includes(origin?.toLowerCase()?.replace(' ', '')))
      );
    }

    // Apply theme filter
    if (filters?.themes?.length) {
      filtered = filtered?.filter(character =>
        character?.themes?.some(theme => filters?.themes?.includes(theme))
      );
    }

    // Apply popularity filter
    if (filters?.minPopularity) {
      filtered = filtered?.filter(character =>
        character?.popularity >= filters?.minPopularity
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'popularity':
        filtered?.sort((a, b) => b?.popularity - a?.popularity);
        break;
      case 'stories':
        filtered?.sort((a, b) => b?.storyCount - a?.storyCount);
        break;
      case 'newest':
        filtered?.sort((a, b) => (b?.isNew ? 1 : 0) - (a?.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [characters, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCharacters?.length / charactersPerPage);
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  const currentCharacters = filteredAndSortedCharacters?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButton = (page, isActive = false) => (
    <Button
      key={page}
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={() => handlePageChange(page)}
      className={`w-10 h-10 ${isActive ? 'shadow-cultural' : ''}`}
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
          <span key="ellipsis1" className="px-2 text-muted-foreground">...</span>
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
          <span key="ellipsis2" className="px-2 text-muted-foreground">...</span>
        );
      }
      
      // Always show last page
      pages?.push(renderPaginationButton(totalPages, currentPage === totalPages));
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
        
        {pages}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
    );
  };

  if (filteredAndSortedCharacters?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Tidak ada karakter ditemukan
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Kami tidak dapat menemukan karakter yang sesuai dengan filter Anda
          saat ini. Coba sesuaikan kriteria pencarian Anda atau hapus beberapa
          filter.
        </p>
        <Button variant="outline">
          <Icon name="RotateCcw" size={16} />
          Reset Filter
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          Menunjukkan {startIndex + 1}-
          {Math.min(endIndex, filteredAndSortedCharacters?.length)} of{" "}
          {filteredAndSortedCharacters?.length} Karakter
        </div>
        <div className="text-sm text-muted-foreground">
          Halaman {currentPage} of {totalPages}
        </div>
      </div>
      {/* Character Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {currentCharacters?.map((character) => (
          <CharacterCard
            key={character?.id}
            character={character}
            onSelect={onCharacterSelect}
            isSelected={selectedCharacter?.id === character?.id}
          />
        ))}
      </div>
      {/* Pagination */}
      {renderPagination()}
      {/* Load More Button for Mobile */}
      <div className="md:hidden mt-8 text-center">
        {currentPage < totalPages && (
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-full"
          >
            <Icon name="Plus" size={16} />
            Muat Lebih Banyak Karakter
          </Button>
        )}
      </div>
    </div>
  );
};

export default CharacterGrid;