import { useState, useEffect, useCallback, useRef } from 'react';
import { SoundProvider } from './components/SoundContext';
import { Navbar } from './components/Navbar';
import { MenuDrawer } from './components/MenuDrawer';
import { HomeStages } from './components/HomeStages';
import { AboutView } from './components/AboutView';
import { PhotographyView } from './components/PhotographyView';
import { ArchiveView } from './components/ArchiveView';
import { StageNavigator, STAGES } from './components/StageNavigator';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { GridReveal } from './components/GridReveal';
import { PageTransition } from './components/PageTransition';
import { useLenis } from './hooks/useLenis';
import { AppPage, ProjectItem } from './types';

export default function App() {
  // Butter-smooth inertial scrolling
  useLenis();

  const [activePage, setActivePage] = useState<AppPage>('home');
  const [scrollStage, setScrollStage] = useState<AppPage>('home');
  const [pendingPage, setPendingPage] = useState<AppPage | null>(null);
  const [transitionStatus, setTransitionStatus] = useState<'idle' | 'exiting' | 'entering'>('idle');

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);

  // Section Scroll Spy for Stage Navigator when on Home page
  useEffect(() => {
    if (activePage !== 'home') {
      setScrollStage(activePage);
      return;
    }

    const handleScroll = () => {
      const statsEl = document.getElementById('stats-tools-anchor');
      const workEl = document.getElementById('selected-work-wrapper');
      const certEl = document.getElementById('certificates-section');

      const scrollY = window.scrollY + window.innerHeight * 0.4;

      if (certEl && scrollY >= certEl.offsetTop) {
        setScrollStage('certificates');
      } else if (workEl && scrollY >= workEl.offsetTop) {
        setScrollStage('work');
      } else if (statsEl && scrollY >= statsEl.offsetTop) {
        setScrollStage('stats');
      } else {
        setScrollStage('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  // Navigate between sections or sub-views
  const navigateToPage = useCallback((newPage: AppPage) => {
    // If navigating between scroll sections while on home:
    const isScrollSection = ['home', 'stats', 'work', 'certificates', 'experience'].includes(newPage);
    
    if (activePage === 'home' && isScrollSection) {
      if (newPage === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (newPage === 'stats') {
        const el = document.getElementById('stats-tools-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (newPage === 'work') {
        const el = document.getElementById('selected-work-wrapper');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (newPage === 'certificates' || newPage === 'experience') {
        const el = document.getElementById('certificates-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollStage(newPage === 'experience' ? 'certificates' : newPage);
      return;
    }

    // Otherwise, execute full pixel transition between views
    if (newPage === activePage && transitionStatus === 'idle') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setPendingPage(newPage);
    setTransitionStatus('exiting');
  }, [activePage, transitionStatus]);

  const handleExited = () => {
    if (pendingPage) {
      setActivePage(pendingPage);
      setPendingPage(null);
    }
    window.scrollTo(0, 0);
    setTransitionStatus('entering');
  };

  const handleEntered = () => {
    setTransitionStatus('idle');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: ProjectItem) => {
    if (project.tag === 'case-study' || project.details) {
      setActiveCaseStudy(project);
    } else if (project.href) {
      window.open(project.href, '_blank', 'noopener,noreferrer');
    }
  };

  // Keyboard Stage Navigation (1-5 to jump, Arrow Left/Right to traverse)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        isMenuOpen ||
        activeCaseStudy ||
        transitionStatus !== 'idle' ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        return;
      }

      const currentStageId = activePage === 'home' ? scrollStage : activePage;
      const stageIndex = STAGES.findIndex((s) => s.id === currentStageId);

      if (e.key >= '1' && e.key <= '5') {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx >= 0 && targetIdx < STAGES.length) {
          navigateToPage(STAGES[targetIdx].id);
        }
      } else if (e.key === 'ArrowRight' && stageIndex >= 0 && stageIndex < STAGES.length - 1) {
        // Only trigger stage jump if not actively interacting with carousel
        if (scrollStage !== 'work') {
          navigateToPage(STAGES[stageIndex + 1].id);
        }
      } else if (e.key === 'ArrowLeft' && stageIndex > 0) {
        if (scrollStage !== 'work') {
          navigateToPage(STAGES[stageIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, scrollStage, activeCaseStudy, isMenuOpen, navigateToPage, transitionStatus]);

  return (
    <SoundProvider>
      <div className="min-h-screen bg-[#000000] text-[#F5F0EB] selection:bg-[#9df133] selection:text-black">
        {/* Fullscreen Pixel Matrix Page-to-Page Transition Wipe */}
        <PageTransition
          status={transitionStatus}
          onExited={handleExited}
          onEntered={handleEntered}
        />

        {/* Technical Boot Grid Reveal Sequence */}
        <GridReveal />

        {/* Top Fixed Navigation Bar */}
        <Navbar
          activePage={activePage === 'home' ? scrollStage : activePage}
          onNavigatePage={navigateToPage}
          onOpenMenu={() => setIsMenuOpen(true)}
          onScrollToTop={scrollToTop}
        />

        {/* Navigation Menu Drawer */}
        <MenuDrawer
          isOpen={isMenuOpen}
          activePage={activePage === 'home' ? scrollStage : activePage}
          onClose={() => setIsMenuOpen(false)}
          onNavigatePage={navigateToPage}
        />

        {/* View Rendering */}
        <main className="w-full pt-[64px]">
          {activePage === 'home' && (
            <HomeStages
              onSelectProject={handleSelectProject}
              onExploreWork={() => {
                const el = document.getElementById('selected-work-wrapper');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {activePage === 'about' && (
            <AboutView
              onBack={() => navigateToPage('home')}
              onNavigatePage={navigateToPage}
            />
          )}

          {activePage === 'photography' && (
            <PhotographyView onBack={() => navigateToPage('home')} />
          )}

          {activePage === 'archive' && (
            <ArchiveView onBack={() => navigateToPage('home')} />
          )}
        </main>

        {/* Footer Section */}
        <Footer
          onNavigatePage={navigateToPage}
          onScrollToTop={scrollToTop}
        />

        {/* Detailed Case Study Modal */}
        <CaseStudyModal
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
        />
      </div>
    </SoundProvider>
  );
}
