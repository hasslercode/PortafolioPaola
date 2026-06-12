(function () {
    'use strict';

    var CONTENT_PATH = 'public/content.json';
    var previewContent = null;

    function getNestedValue(obj, path) {
        return path.split('.').reduce(function (current, key) {
            if (current === null || current === undefined) {
                return undefined;
            }
            return current[key];
        }, obj);
    }

    function setText(selector, value) {
        if (value === undefined || value === null) {
            return;
        }
        var el = document.querySelector(selector);
        if (el) {
            el.textContent = value;
        }
    }

    function setMeta() {
        var content = window.__SITE_CONTENT__;
        if (!content || !content.meta) {
            return;
        }
        var meta = content.meta;
        document.title = meta.title || document.title;

        var description = document.querySelector('meta[name="description"]');
        if (description && meta.description) {
            description.setAttribute('content', meta.description);
        }

        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && meta.ogTitle) {
            ogTitle.setAttribute('content', meta.ogTitle);
        }

        var ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription && meta.ogDescription) {
            ogDescription.setAttribute('content', meta.ogDescription);
        }

        var twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle && meta.twitterTitle) {
            twitterTitle.setAttribute('content', meta.twitterTitle);
        }

        var twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription && meta.twitterDescription) {
            twitterDescription.setAttribute('content', meta.twitterDescription);
        }
    }

    function applyHeader(header) {
        if (!header) {
            return;
        }

        var logoLink = document.querySelector('.site-logo');
        if (logoLink && header.logoAriaLabel) {
            logoLink.setAttribute('aria-label', header.logoAriaLabel);
        }

        setText('[data-content="header.logoName"]', header.logoName);

        var taglineWords = document.querySelectorAll('[data-content="header.taglineWord"]');
        if (header.taglineWords && taglineWords.length) {
            taglineWords.forEach(function (el, index) {
                if (header.taglineWords[index]) {
                    el.textContent = header.taglineWords[index];
                }
            });
        }

        setText('[data-content="header.nav.inicio"]', header.nav && header.nav.inicio);
        setText('[data-content="header.nav.servicios"]', header.nav && header.nav.servicios);
        setText('[data-content="header.nav.experiencias"]', header.nav && header.nav.experiencias);
        setText('[data-content="header.nav.portafolio"]', header.nav && header.nav.portafolio);
        setText('[data-content="header.nav.contacto"]', header.nav && header.nav.contacto);
        setText('[data-content="header.cta"]', header.cta);

        if (header.menuOpenLabel && header.menuCloseLabel) {
            window.__HEADER_MENU_LABELS__ = {
                open: header.menuOpenLabel,
                close: header.menuCloseLabel
            };
        }
    }

    function applyHero(hero) {
        if (!hero) {
            return;
        }

        setText('[data-content="hero.taglineLine1"]', hero.taglineLine1);
        setText('[data-content="hero.taglineAccent"]', hero.taglineAccent);
        setText('[data-content="hero.titleLine1"]', hero.titleLine1);
        setText('[data-content="hero.titleLine2Prefix"]', hero.titleLine2Prefix);
        setText('[data-content="hero.titleLine2Accent"]', hero.titleLine2Accent);
        setText('[data-content="hero.descriptionBefore"]', hero.descriptionBefore);
        setText('[data-content="hero.descriptionAccent"]', hero.descriptionAccent);
        setText('[data-content="hero.cta"]', hero.cta);
        setText('[data-content="hero.metricValue"]', hero.metricValue);
        setText('[data-content="hero.metricLabel"]', hero.metricLabel);
        setText('[data-content="hero.verticalLabel"]', hero.verticalLabel);

        var heroImg = document.querySelector('[data-content="hero.imageAlt"]');
        if (heroImg && hero.imageAlt) {
            heroImg.setAttribute('alt', hero.imageAlt);
        }

        var heroCta = document.querySelector('.hero-cta-group [data-open-contact-modal]');
        if (heroCta && hero.ctaAriaLabel) {
            heroCta.setAttribute('aria-label', hero.ctaAriaLabel);
        }
    }

    function applyPerformance(performance) {
        if (!performance || !performance.items) {
            return;
        }

        var items = document.querySelectorAll('[data-content-list="performance.items"]');
        items.forEach(function (el, index) {
            var item = performance.items[index];
            if (!item) {
                return;
            }
            var title = el.querySelector('[data-content-field="title"]');
            var description = el.querySelector('[data-content-field="description"]');
            if (title) {
                title.textContent = item.title;
            }
            if (description) {
                description.textContent = item.description;
            }
        });
    }

    function applyExperience(experience) {
        if (!experience) {
            return;
        }

        setText('[data-content="experience.badge"]', experience.badge);
        setText('[data-content="experience.title"]', experience.title);
        setText('[data-content="experience.titleScript"]', experience.titleScript);
        setText('[data-content="experience.copyBefore"]', experience.copyBefore);
        setText('[data-content="experience.copyAccent"]', experience.copyAccent);
        setText('[data-content="experience.note"]', experience.note);

        var campaignCards = document.querySelectorAll('[data-content-list="experience.campaigns"]');
        campaignCards.forEach(function (card, index) {
            var campaign = experience.campaigns && experience.campaigns[index];
            if (!campaign) {
                return;
            }
            var name = card.querySelector('[data-content-field="name"]');
            var category = card.querySelector('[data-content-field="category"]');
            var metric = card.querySelector('[data-content-field="metric"]');
            var metricLabel = card.querySelector('[data-content-field="metricLabel"]');
            var ctaLinks = card.querySelectorAll('[data-content-field="ctaLink"]');
            var logo = card.querySelector('.brand-header__logo');

            if (name) {
                name.textContent = campaign.name;
            }
            if (logo && campaign.name) {
                logo.setAttribute('alt', 'Logotipo de ' + campaign.name);
            }
            if (category) {
                category.textContent = campaign.category;
            }
            if (metric) {
                metric.textContent = campaign.metric;
            }
            if (metricLabel) {
                metricLabel.textContent = campaign.metricLabel;
            }
            if (campaign.ctaLink) {
                ctaLinks.forEach(function (link) {
                    link.setAttribute('href', campaign.ctaLink);
                    if (campaign.ctaAriaLabel) {
                        link.setAttribute('aria-label', campaign.ctaAriaLabel);
                    }
                });
            }
        });

        if (experience.results) {
            setText('[data-content="experience.results.leadBefore"]', experience.results.leadBefore);
            setText('[data-content="experience.results.leadAccent"]', experience.results.leadAccent);

            var statItems = document.querySelectorAll('[data-content-list="experience.results.stats"]');
            statItems.forEach(function (el, index) {
                var stat = experience.results.stats && experience.results.stats[index];
                if (!stat) {
                    return;
                }
                var value = el.querySelector('[data-content-field="value"]');
                var label = el.querySelector('[data-content-field="label"]');
                if (value) {
                    value.textContent = stat.value;
                }
                if (label) {
                    label.textContent = stat.label;
                }
            });
        }
    }

    function applyResultsProof(resultsProof) {
        if (!resultsProof) {
            return;
        }

        setText('[data-content="resultsProof.badge"]', resultsProof.badge);
        setText('[data-content="resultsProof.titleBefore"]', resultsProof.titleBefore);
        setText('[data-content="resultsProof.titleAccent"]', resultsProof.titleAccent);
        setText('[data-content="resultsProof.titleAfter"]', resultsProof.titleAfter);
        setText('[data-content="resultsProof.description"]', resultsProof.description);
        setText('[data-content="resultsProof.note"]', resultsProof.note);
        setText('[data-content="resultsProof.primaryKpi.value"]', resultsProof.primaryKpi && resultsProof.primaryKpi.value);
        setText('[data-content="resultsProof.primaryKpi.labelBefore"]', resultsProof.primaryKpi && resultsProof.primaryKpi.labelBefore);
        setText('[data-content="resultsProof.primaryKpi.labelAccent"]', resultsProof.primaryKpi && resultsProof.primaryKpi.labelAccent);
        setText('[data-content="resultsProof.chart.titleBefore"]', resultsProof.chart && resultsProof.chart.titleBefore);
        setText('[data-content="resultsProof.chart.titleAccent"]', resultsProof.chart && resultsProof.chart.titleAccent);
        setText('[data-content="resultsProof.chart.titleAfter"]', resultsProof.chart && resultsProof.chart.titleAfter);
        setText('[data-content="resultsProof.contentTitleBefore"]', resultsProof.contentTitleBefore);
        setText('[data-content="resultsProof.contentTitleAccent"]', resultsProof.contentTitleAccent);
        setText('[data-content="resultsProof.cta"]', resultsProof.cta);

        var resultsCta = document.querySelector('.results-proof__cta[data-open-contact-modal]');
        if (resultsCta && resultsProof.ctaAriaLabel) {
            resultsCta.setAttribute('aria-label', resultsProof.ctaAriaLabel);
        }

        var secondaryKpis = document.querySelectorAll('[data-content-list="resultsProof.secondaryKpis"]');
        secondaryKpis.forEach(function (el, index) {
            var kpi = resultsProof.secondaryKpis && resultsProof.secondaryKpis[index];
            if (!kpi) {
                return;
            }
            var value = el.querySelector('[data-content-field="value"]');
            var label = el.querySelector('[data-content-field="label"]');
            if (value) {
                value.textContent = kpi.value;
            }
            if (label) {
                label.textContent = kpi.label;
            }
        });

        var reels = document.querySelectorAll('[data-content-list="resultsProof.reels"]');
        reels.forEach(function (el, index) {
            var reel = resultsProof.reels && resultsProof.reels[index];
            if (!reel) {
                return;
            }
            var metric = el.querySelector('[data-content-field="metric"]');
            var category = el.querySelector('[data-content-field="category"]');
            var description = el.querySelector('[data-content-field="description"]');
            var image = el.querySelector('[data-content-field="imageAlt"]');
            var ctaLinks = el.querySelectorAll('[data-content-field="ctaLink"]');
            if (metric) {
                metric.textContent = reel.metric;
            }
            if (category) {
                category.textContent = reel.category;
            }
            if (description) {
                description.textContent = reel.description;
            }
            if (image && reel.imageAlt) {
                image.setAttribute('alt', reel.imageAlt);
            }
            if (reel.ctaLink) {
                ctaLinks.forEach(function (ctaLink) {
                    ctaLink.setAttribute('href', reel.ctaLink);
                    if (reel.ctaAriaLabel) {
                        ctaLink.setAttribute('aria-label', reel.ctaAriaLabel);
                    }
                });
            }
        });

        var trustItems = document.querySelectorAll('[data-content-list="resultsProof.trustItems"]');
        trustItems.forEach(function (el, index) {
            var item = resultsProof.trustItems && resultsProof.trustItems[index];
            if (!item) {
                return;
            }
            var title = el.querySelector('[data-content-field="title"]');
            var subtitle = el.querySelector('[data-content-field="subtitle"]');
            if (title) {
                title.textContent = item.title;
            }
            if (subtitle) {
                subtitle.textContent = item.subtitle;
            }
        });
    }

    function applyServices(services) {
        if (!services) {
            return;
        }

        setText('[data-content="services.badge"]', services.badge);
        setText('[data-content="services.titleBefore"]', services.titleBefore);
        setText('[data-content="services.titleScript"]', services.titleScript);
        setText('[data-content="services.subtitleBefore"]', services.subtitleBefore);
        setText('[data-content="services.subtitleAccent1"]', services.subtitleAccent1);
        setText('[data-content="services.subtitleMiddle"]', services.subtitleMiddle);
        setText('[data-content="services.subtitleAccent2"]', services.subtitleAccent2);
        setText('[data-content="services.subtitleAfter"]', services.subtitleAfter);

        var cards = document.querySelectorAll('[data-content-list="services.cards"]');
        cards.forEach(function (card, index) {
            var item = services.cards && services.cards[index];
            if (!item) {
                return;
            }
            var titleLine1 = card.querySelector('[data-content-field="titleLine1"]');
            var titleBefore = card.querySelector('[data-content-field="titleBefore"]');
            var titleScript = card.querySelector('[data-content-field="titleScript"]');
            var description = card.querySelector('[data-content-field="description"]');

            if (titleLine1) {
                titleLine1.textContent = item.titleLine1 || '';
            }
            if (titleBefore) {
                titleBefore.textContent = item.titleBefore || '';
            }
            if (titleScript) {
                titleScript.textContent = item.titleScript || '';
            }
            if (description) {
                description.textContent = item.description;
            }
        });
    }

    function applySkills(skills) {
        if (!skills) {
            return;
        }

        setText('[data-content="skills.badge"]', skills.badge);
        setText('[data-content="skills.title"]', skills.title);
        setText('[data-content="skills.titleScript"]', skills.titleScript);
        setText('[data-content="skills.descriptionBefore"]', skills.descriptionBefore);
        setText('[data-content="skills.descriptionAccent"]', skills.descriptionAccent);

        var items = document.querySelectorAll('[data-content-list="skills.items"]');
        items.forEach(function (el, index) {
            var item = skills.items && skills.items[index];
            if (!item) {
                return;
            }
            var name = el.querySelector('[data-content-field="name"]');
            var percentage = el.querySelector('[data-content-field="percentage"]');
            if (name) {
                name.textContent = item.name;
            }
            if (percentage) {
                percentage.textContent = item.percentage;
            }
        });
    }

    function applyProcess(process) {
        if (!process) {
            return;
        }

        setText('[data-content="process.badge"]', process.badge);
        setText('[data-content="process.titleBefore"]', process.titleBefore);
        setText('[data-content="process.titleScript"]', process.titleScript);
        setText('[data-content="process.quoteBefore"]', process.quoteBefore);
        setText('[data-content="process.quoteAccent"]', process.quoteAccent);
        setText('[data-content="process.quoteAfter"]', process.quoteAfter);

        var steps = document.querySelectorAll('[data-content-list="process.steps"]');
        steps.forEach(function (el, index) {
            var step = process.steps && process.steps[index];
            if (!step) {
                return;
            }
            var title = el.querySelector('[data-content-field="title"]');
            var descriptionBefore = el.querySelector('[data-content-field="descriptionBefore"]');
            var descriptionAccent = el.querySelector('[data-content-field="descriptionAccent"]');
            var descriptionAfter = el.querySelector('[data-content-field="descriptionAfter"]');

            if (title) {
                title.textContent = step.title;
            }
            if (descriptionBefore) {
                descriptionBefore.textContent = step.descriptionBefore || '';
            }
            if (descriptionAccent) {
                descriptionAccent.textContent = step.descriptionAccent || '';
            }
            if (descriptionAfter) {
                descriptionAfter.textContent = step.descriptionAfter || '';
            }
        });
    }

    function applyContact(contact) {
        if (!contact) {
            return;
        }

        setText('[data-content="contact.titleScript"]', contact.titleScript);
        setText('[data-content="contact.titleBefore"]', contact.titleBefore);
        setText('[data-content="contact.titleSerif"]', contact.titleSerif);
        setText('[data-content="contact.descriptionBefore"]', contact.descriptionBefore);
        setText('[data-content="contact.descriptionAccent"]', contact.descriptionAccent);
        setText('[data-content="contact.cta"]', contact.cta);
        setText('[data-content="contact.email"]', contact.email);
        setText('[data-content="contact.phone"]', contact.phone);

        var contactCta = document.querySelector('.btn-hablemos-final[data-open-contact-modal]');
        if (contactCta && contact.ctaAriaLabel) {
            contactCta.setAttribute('aria-label', contact.ctaAriaLabel);
        }
    }

    function applyFooter(footer) {
        if (!footer) {
            return;
        }

        setText('[data-content="footer.brandName"]', footer.brandName);
        setText('[data-content="footer.brandTagline"]', footer.brandTagline);
        setText('[data-content="footer.brandDescription"]', footer.brandDescription);
        setText('[data-content="footer.navTitle"]', footer.navTitle);
        setText('[data-content="footer.socialTitle"]', footer.socialTitle);
        setText('[data-content="footer.missionTitle"]', footer.missionTitle);
        setText('[data-content="footer.copyright"]', footer.copyright);
        setText('[data-content="footer.legal.privacy"]', footer.legal && footer.legal.privacy);
        setText('[data-content="footer.legal.terms"]', footer.legal && footer.legal.terms);
        setText('[data-content="footer.legal.notice"]', footer.legal && footer.legal.notice);

        setText('[data-content="footer.nav.inicio"]', footer.nav && footer.nav.inicio);
        setText('[data-content="footer.nav.servicios"]', footer.nav && footer.nav.servicios);
        setText('[data-content="footer.nav.experiencias"]', footer.nav && footer.nav.experiencias);
        setText('[data-content="footer.nav.portafolio"]', footer.nav && footer.nav.portafolio);
        setText('[data-content="footer.nav.recursos"]', footer.nav && footer.nav.recursos);
        setText('[data-content="footer.nav.contacto"]', footer.nav && footer.nav.contacto);

        var socialLinks = document.querySelectorAll('[data-content-list="footer.socials"]');
        socialLinks.forEach(function (el, index) {
            var social = footer.socials && footer.socials[index];
            if (!social) {
                return;
            }
            var name = el.querySelector('[data-content-field="name"]');
            if (name) {
                name.textContent = social.name;
            }
        });

        var missionItems = document.querySelectorAll('[data-content-list="footer.missionItems"]');
        missionItems.forEach(function (el, index) {
            var item = footer.missionItems && footer.missionItems[index];
            if (item) {
                el.textContent = item;
            }
        });
    }

    function applyModals(modals) {
        if (!modals) {
            return;
        }

        if (modals.contact) {
            var contact = modals.contact;
            setText('[data-content="modals.contact.titleBefore"]', contact.titleBefore);
            setText('[data-content="modals.contact.titleAccent"]', contact.titleAccent);
            setText('[data-content="modals.contact.introBefore"]', contact.introBefore);
            setText('[data-content="modals.contact.introAccent"]', contact.introAccent);
            setText('[data-content="modals.contact.introAfter"]', contact.introAfter);
            setText('[data-content="modals.contact.email"]', contact.email);
            setText('[data-content="modals.contact.phone"]', contact.phone);
            setText('[data-content="modals.contact.instagram"]', contact.instagram);
            setText('[data-content="modals.contact.whatsapp"]', contact.whatsapp);

            var contactClose = document.querySelector('[data-content="modals.contact.closeLabel"]');
            if (contactClose && contact.closeLabel) {
                contactClose.setAttribute('aria-label', contact.closeLabel);
            }
        }

        if (modals.portfolio) {
            var portfolio = modals.portfolio;
            setText('[data-content="modals.portfolio.title"]', portfolio.title);
            setText('[data-content="modals.portfolio.download"]', portfolio.download);
            setText('[data-content="modals.portfolio.close"]', portfolio.close);

            var portfolioClose = document.querySelector('[data-content="modals.portfolio.closeLabel"]');
            if (portfolioClose && portfolio.closeLabel) {
                portfolioClose.setAttribute('aria-label', portfolio.closeLabel);
            }
        }
    }

    function applyContent(content) {
        window.__SITE_CONTENT__ = content;
        setMeta();
        applyHeader(content.header);
        applyHero(content.hero);
        applyPerformance(content.performance);
        applyExperience(content.experience);
        applyResultsProof(content.resultsProof);
        applyServices(content.services);
        applySkills(content.skills);
        applyProcess(content.process);
        applyContact(content.contact);
        applyFooter(content.footer);
        applyModals(content.modals);
        document.documentElement.classList.add('content-ready');
    }

    function loadFromPreviewMessage() {
        return new Promise(function (resolve) {
            if (!window.location.search.includes('preview=1')) {
                resolve(null);
                return;
            }

            function onMessage(event) {
                if (event.data && event.data.type === 'PREVIEW_CONTENT') {
                    window.removeEventListener('message', onMessage);
                    resolve(event.data.content);
                }
            }

            window.addEventListener('message', onMessage);

            if (window.parent !== window) {
                window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
            }

            setTimeout(function () {
                resolve(previewContent);
            }, 500);
        });
    }

    async function init() {
        try {
            var content = null;

            if (window.__PREVIEW_CONTENT__) {
                content = window.__PREVIEW_CONTENT__;
            } else {
                var previewData = await loadFromPreviewMessage();
                if (previewData) {
                    content = previewData;
                } else {
                    var response = await fetch(CONTENT_PATH);
                    if (!response.ok) {
                        throw new Error('No se pudo cargar el contenido');
                    }
                    content = await response.json();
                }
            }

            applyContent(content);
        } catch (error) {
            console.error('Error cargando contenido:', error);
            document.documentElement.classList.add('content-ready');
        }
    }

    window.__applySiteContent = applyContent;
    window.__setPreviewContent = function (content) {
        previewContent = content;
        window.__PREVIEW_CONTENT__ = content;
    };

    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'PREVIEW_CONTENT' && event.data.content) {
            applyContent(event.data.content);
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
