import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
        Dimensions,
        FlatList,
        Image,
        Modal,
        ScrollView,
        StyleSheet,
        Text,
        TextInput,
        TouchableOpacity,
        View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Dummy Programs Data
const allPrograms = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    ratingCount: 2847,
    students: 12500,
    duration: '45h',
    level: 'Beginner',
    price: '₹999',
    originalPrice: '₹2999',
    isFree: false,
    category: 'Technology',
    description: 'Master modern web development with HTML, CSS, JavaScript, React',
    image: 'https://img-c.udemycdn.com/course/750x422/548278_b005_9.jpg',
    isWishlisted: false,
    tags: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Mike Chen',
    rating: 4.9,
    ratingCount: 1543,
    students: 8900,
    duration: '28h',
    level: 'Intermediate',
    price: 'Free',
    originalPrice: null,
    isFree: true,
    category: 'Design',
    description: 'Learn professional UI/UX design principles and tools',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80',
    isWishlisted: true,
    tags: ['Figma', 'Adobe XD', 'Prototyping']
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    instructor: 'Emma Davis',
    rating: 4.7,
    ratingCount: 987,
    students: 6700,
    duration: '18h',
    level: 'Beginner',
    price: '₹799',
    originalPrice: '₹1999',
    isFree: false,
    category: 'Marketing',
    description: 'Master digital marketing with SEO, SEM, and social media',
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg',
    isWishlisted: false,
    tags: ['SEO', 'Google Ads', 'Social Media']
  },
  {
    id: '4',
    title: 'Python for Data Science',
    instructor: 'Dr. Alex Morgan',
    rating: 4.6,
    ratingCount: 2156,
    students: 15600,
    duration: '52h',
    level: 'Advanced',
    price: '₹1299',
    originalPrice: '₹3999',
    isFree: false,
    category: 'Technology',
    description: 'Complete Python programming for data analysis and machine learning',
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg',
    isWishlisted: false,
    tags: ['Python', 'Pandas', 'NumPy', 'ML']
  },
  {
    id: '5',
    title: 'Mobile App Design Fundamentals',
    instructor: 'Lisa Parker',
    rating: 4.8,
    ratingCount: 756,
    students: 4200,
    duration: '15h',
    level: 'Beginner',
    price: 'Free',
    originalPrice: null,
    isFree: true,
    category: 'Design',
    description: 'Learn to design beautiful mobile applications',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/YleqW8eqJrFgg956/social-share-1920x1080-3-A85EG14X87iaEK49.jpg',
    isWishlisted: true,
    tags: ['Mobile Design', 'iOS', 'Android']
  },
  {
    id: '6',
    title: 'Business Strategy & Leadership',
    instructor: 'Robert Kim',
    rating: 4.7,
    ratingCount: 1234,
    students: 7800,
    duration: '32h',
    level: 'Intermediate',
    price: '₹1599',
    originalPrice: '₹4999',
    isFree: false,
    category: 'Business',
    description: 'Develop strategic thinking and leadership skills',
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240223125319/Business-Strategy-copy.webp',
    isWishlisted: false,
    tags: ['Leadership', 'Strategy', 'Management']
  },
  {
    id: '7',
    title: 'Graphic Design with Photoshop',
    instructor: 'Anna Johnson',
    rating: 4.5,
    ratingCount: 892,
    students: 5400,
    duration: '22h',
    level: 'Beginner',
    price: '₹699',
    originalPrice: '₹1999',
    isFree: false,
    category: 'Design',
    description: 'Master Adobe Photoshop for professional graphic design',
    image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80',
    isWishlisted: false,
    tags: ['Photoshop', 'Graphics', 'Adobe']
  },
  {
    id: '8',
    title: 'Machine Learning Basics',
    instructor: 'Dr. Sarah Smith',
    rating: 4.9,
    ratingCount: 1876,
    students: 9200,
    duration: '38h',
    level: 'Advanced',
    price: 'Free',
    originalPrice: null,
    isFree: true,
    category: 'Technology',
    description: 'Introduction to machine learning algorithms and applications',
    image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg',
    isWishlisted: true,
    tags: ['AI', 'ML', 'Algorithms']
  }
];

const categories = ['All', 'Technology', 'Design', 'Business', 'Marketing'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const durations = ['All', 'Short (<10h)', 'Medium (10-30h)', 'Long (>30h)'];
const prices = ['All', 'Free', 'Paid'];
const sortOptions = ['Popular', 'Newest', 'Recommended', 'High Rating', 'Price: Low to High', 'Price: High to Low'];

export default function ProgramsListingPage() {
  const [programs, setPrograms] = useState(allPrograms);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Popular');

  // Filter and search logic
  const getFilteredPrograms = () => {
    let filtered = allPrograms.filter(program => {
      // Search filter
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
      
      // Level filter
      const matchesLevel = selectedLevel === 'All' || program.level === selectedLevel;
      
      // Duration filter
      const matchesDuration = selectedDuration === 'All' || 
        (selectedDuration === 'Short (<10h)' && parseInt(program.duration) < 10) ||
        (selectedDuration === 'Medium (10-30h)' && parseInt(program.duration) >= 10 && parseInt(program.duration) <= 30) ||
        (selectedDuration === 'Long (>30h)' && parseInt(program.duration) > 30);
      
      // Price filter
      const matchesPrice = selectedPrice === 'All' || 
        (selectedPrice === 'Free' && program.isFree) ||
        (selectedPrice === 'Paid' && !program.isFree);
      
      return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPrice;
    });

    // Sort logic
    switch (selectedSort) {
      case 'High Rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'Popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'Price: Low to High':
        filtered.sort((a, b) => {
          if (a.isFree && !b.isFree) return -1;
          if (!a.isFree && b.isFree) return 1;
          if (a.isFree && b.isFree) return 0;
          return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
        });
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => {
          if (a.isFree && !b.isFree) return 1;
          if (!a.isFree && b.isFree) return -1;
          if (a.isFree && b.isFree) return 0;
          return parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''));
        });
        break;
    }

    return filtered;
  };

  const toggleWishlist = (programId) => {
    setPrograms(prevPrograms =>
      prevPrograms.map(program =>
        program.id === programId
          ? { ...program, isWishlisted: !program.isWishlisted }
          : program
      )
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedDuration('All');
    setSelectedPrice('All');
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedLevel !== 'All') count++;
    if (selectedDuration !== 'All') count++;
    if (selectedPrice !== 'All') count++;
    return count;
  };

  const renderProgramCard = ({ item, index }) => {
    if (isGridView) {
      return (
        <TouchableOpacity 
          style={styles.gridCard}
          onPress={() => router.push(`/course/${item.id}`)}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.gridImage} />
            <TouchableOpacity 
              style={styles.wishlistButton}
              onPress={() => toggleWishlist(item.id)}
            >
              <Ionicons 
                name={item.isWishlisted ? 'heart' : 'heart-outline'} 
                size={20} 
                color={item.isWishlisted ? '#FF6B6B' : '#666'} 
              />
            </TouchableOpacity>
            {item.isFree && (
              <View style={styles.freeBadge}>
                <Text style={styles.freeBadgeText}>FREE</Text>
              </View>
            )}
          </View>
          
          <View style={styles.gridCardContent}>
            <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.gridInstructor}>{item.instructor}</Text>
            
            <View style={styles.gridMetrics}>
              <View style={styles.rating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.ratingCount}>({item.ratingCount})</Text>
              </View>
            </View>
            
            <View style={styles.gridFooter}>
              <Text style={styles.duration}>{item.duration} • {item.level}</Text>
              <Text style={styles.gridPrice}>{item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity 
          style={styles.listCard}
          onPress={() => router.push(`/course/${item.id}`)}
        >
          <Image source={{ uri: item.image }} style={styles.listImage} />
          
          <View style={styles.listContent}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle} numberOfLines={2}>{item.title}</Text>
              <TouchableOpacity 
                style={styles.wishlistButtonList}
                onPress={() => toggleWishlist(item.id)}
              >
                <Ionicons 
                  name={item.isWishlisted ? 'heart' : 'heart-outline'} 
                  size={20} 
                  color={item.isWishlisted ? '#FF6B6B' : '#666'} 
                />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.listInstructor}>{item.instructor}</Text>
            <Text style={styles.listDescription} numberOfLines={2}>{item.description}</Text>
            
            <View style={styles.listMetrics}>
              <View style={styles.rating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.ratingCount}>({item.ratingCount})</Text>
              </View>
              <Text style={styles.students}>{item.students.toLocaleString()} students</Text>
            </View>
            
            <View style={styles.listFooter}>
              <View style={styles.listMetaInfo}>
                <Text style={styles.duration}>{item.duration}</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{item.level}</Text>
                </View>
                {item.isFree && (
                  <View style={styles.freeTag}>
                    <Text style={styles.freeTagText}>FREE</Text>
                  </View>
                )}
              </View>
              <View style={styles.priceContainer}>
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                )}
                <Text style={styles.listPrice}>{item.price}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const filteredPrograms = getFilteredPrograms();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>Explore Programs</Text>
        <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
          <Ionicons 
            name={isGridView ? 'list' : 'grid'} 
            size={24} 
            color="#333" 
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search programs, instructors..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters & Sort Bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity 
          style={[styles.filterButton, getActiveFilterCount() > 0 && styles.filterButtonActive]}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={16} color={getActiveFilterCount() > 0 ? 'white' : '#333'} />
          <Text style={[styles.filterButtonText, getActiveFilterCount() > 0 && styles.filterButtonTextActive]}>
            Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical" size={16} color="#333" />
          <Text style={styles.sortButtonText}>{selectedSort}</Text>
        </TouchableOpacity>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredPrograms.length} programs found
        </Text>
        {getActiveFilterCount() > 0 && (
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearFilters}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Programs List */}
      <FlatList
        data={filteredPrograms}
        renderItem={renderProgramCard}
        keyExtractor={(item) => item.id}
        numColumns={isGridView ? 2 : 1}
        key={isGridView ? 'grid' : 'list'}
        contentContainerStyle={styles.programsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilters}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.filterContent}>
              {/* Category Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Category</Text>
                <View style={styles.filterOptions}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.filterOption,
                        selectedCategory === category && styles.filterOptionActive
                      ]}
                      onPress={() => setSelectedCategory(category)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedCategory === category && styles.filterOptionTextActive
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Level Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Level</Text>
                <View style={styles.filterOptions}>
                  {levels.map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.filterOption,
                        selectedLevel === level && styles.filterOptionActive
                      ]}
                      onPress={() => setSelectedLevel(level)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedLevel === level && styles.filterOptionTextActive
                      ]}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Duration Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Duration</Text>
                <View style={styles.filterOptions}>
                  {durations.map((duration) => (
                    <TouchableOpacity
                      key={duration}
                      style={[
                        styles.filterOption,
                        selectedDuration === duration && styles.filterOptionActive
                      ]}
                      onPress={() => setSelectedDuration(duration)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedDuration === duration && styles.filterOptionTextActive
                      ]}>
                        {duration}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price</Text>
                <View style={styles.filterOptions}>
                  {prices.map((price) => (
                    <TouchableOpacity
                      key={price}
                      style={[
                        styles.filterOption,
                        selectedPrice === price && styles.filterOptionActive
                      ]}
                      onPress={() => setSelectedPrice(price)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedPrice === price && styles.filterOptionTextActive
                      ]}>
                        {price}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={clearAllFilters}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSortModal}
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sortModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.sortOptions}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.sortOption,
                    selectedSort === option && styles.sortOptionActive
                  ]}
                  onPress={() => {
                    setSelectedSort(option);
                    setShowSortModal(false);
                  }}
                >
                  <Text style={[
                    styles.sortOptionText,
                    selectedSort === option && styles.sortOptionTextActive
                  ]}>
                    {option}
                  </Text>
                  {selectedSort === option && (
                    <Ionicons name="checkmark" size={20} color="#4ECDC4" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  filterButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  clearFilters: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  programsList: {
    paddingHorizontal: 10,
  },
  
  // Grid View Styles
  gridCard: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  freeBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freeBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gridCardContent: {
    padding: 12,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  gridInstructor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  gridMetrics: {
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
    fontWeight: '600',
  },
  ratingCount: {
    fontSize: 11,
    color: '#999',
    marginLeft: 3,
  },
  gridFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 11,
    color: '#666',
  },
  gridPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },

  // List View Styles
  listCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    flex: 1,
    padding: 12,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  listTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 20,
    marginRight: 10,
  },
  wishlistButtonList: {
    padding: 2,
  },
  listInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  listDescription: {
    fontSize: 13,
    color: '#999',
    lineHeight: 16,
    marginBottom: 8,
  },
  listMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  students: {
    fontSize: 12,
    color: '#666',
    marginLeft: 15,
  },
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  levelText: {
    fontSize: 11,
    color: '#666',
  },
  freeTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  freeTagText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  listPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  sortModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterOptionActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333',
  },
  filterOptionTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  sortOptions: {
    padding: 20,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sortOptionActive: {
    backgroundColor: '#f8f9ff',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  sortOptionTextActive: {
    color: '#4ECDC4',
    fontWeight: '600',
  },
});