"""
Seed catalog for NEXORA: Premium Everyday Tech.
Carefully curated products with realistic Indian Rupee (₹) pricing, genuine specifications,
multi-angle high-resolution imagery from Unsplash, and rich tech descriptions.
"""

SEED_PRODUCTS = [
    {
        "id": "prod_pulse_x7",
        "name": "Nexora Pulse X7 Wireless Headphones",
        "slug": "nexora-pulse-x7-wireless-headphones",
        "tagline": "Hybrid Active Noise Cancellation with Custom 45mm Neodymium Drivers",
        "category": "Headphones",
        "price": 8499,
        "original_price": 11999,
        "discount": 29,
        "rating": 4.8,
        "review_count": 428,
        "in_stock": True,
        "stock_count": 34,
        "badge": "Bestseller",
        "description": "Crafted with aircraft-grade aluminum and plush memory foam earpads, the Pulse X7 delivers audiophile-grade precision with adaptive 42dB noise cancellation, 60-hour continuous battery life, and spatial audio with dynamic head tracking.",
        "features": [
            "42dB Adaptive Hybrid Active Noise Cancellation",
            "Custom 45mm Titanium-coated Neodymium Drivers",
            "60-Hour Battery Life with USB-C Quick Charge (10 min = 5 hours)",
            "Multipoint Bluetooth 5.3 with LDAC & AAC codecs",
            "Ultra-soft breathable protein leather memory foam ear cushions"
        ],
        "specs": {
            "Driver Size": "45 mm Dynamic Titanium",
            "Frequency Response": "10 Hz – 40,000 Hz",
            "Battery Life": "60 hrs (ANC off) / 45 hrs (ANC on)",
            "Connectivity": "Bluetooth 5.3 + 3.5mm Aux",
            "Weight": "258 grams",
            "Charging Time": "80 minutes (USB-C)",
            "Warranty": "2 Years Official Nexora India Warranty"
        },
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Matte Obsidian", "Polar Silver", "Midnight Navy"],
        "tags": ["audio", "wireless", "headphones", "anc", "trending"],
        "is_featured": True,
        "is_flash_sale": True
    },
    {
        "id": "prod_arc_75",
        "name": "Nexora Arc 75 Mechanical Keyboard",
        "slug": "nexora-arc-75-mechanical-keyboard",
        "tagline": "Gasket-Mounted CNC Anodized Aluminum 75% Wireless Board",
        "category": "Keyboards",
        "price": 9999,
        "original_price": 13499,
        "discount": 26,
        "rating": 4.9,
        "review_count": 312,
        "in_stock": True,
        "stock_count": 18,
        "badge": "Top Rated",
        "description": "Engineered for connoisseurs of the tactile craft. The Arc 75 features a multi-layer poron gasket isolation mount, pre-lubed custom Moonstone tactile switches, double-shot PBT keycaps, hot-swappable PCB, and tri-mode connectivity (2.4GHz / Bluetooth / Type-C).",
        "features": [
            "Full CNC-milled 6063 Aluminum Chassis with Brass Accent Weight",
            "Pre-lubed Factory Custom Moonstone Tactile Switches (55g actuation)",
            "Double-shot Cherry Profile PBT Keycaps (Dye-sub legends)",
            "Tri-Mode Connectivity: 2.4GHz Wireless, Bluetooth 5.2, Type-C",
            "Rotary CNC volume & multimedia programmable knob"
        ],
        "specs": {
            "Layout": "75% Compact (82 keys + 1 rotary knob)",
            "Mounting Style": "Gasket Mount with Poron & IXPE foam layers",
            "Battery": "4,000 mAh Rechargeable Li-Ion (up to 200 hours)",
            "Switches": "Nexora Moonstone (Hot-swappable 5-pin)",
            "Weight": "1.42 kg solid aluminum",
            "Polling Rate": "1000Hz (2.4G & Wired)",
            "Warranty": "2 Years Nexora Care"
        },
        "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Industrial Gray", "Lunar White", "Cyber Slate"],
        "tags": ["keyboard", "mechanical", "custom", "desk", "trending"],
        "is_featured": True,
        "is_flash_sale": False
    },
    {
        "id": "prod_horizon_watch",
        "name": "Nexora Horizon Smartwatch Gen 3",
        "slug": "nexora-horizon-smartwatch-gen-3",
        "tagline": "1.43-inch Sapphire AMOLED with ECG & Dual-Band GPS",
        "category": "Wearables",
        "price": 14999,
        "original_price": 18999,
        "discount": 21,
        "rating": 4.7,
        "review_count": 284,
        "in_stock": True,
        "stock_count": 22,
        "badge": "New Arrival",
        "description": "Seamlessly blending Scandinavian minimalism with medical-grade biometrics. The Horizon Gen 3 features an aerospace grade titanium case, sapphire crystal glass, continuous SpO2, heart rate variability (HRV), sleep architecture tracking, and up to 14 days of endurance.",
        "features": [
            "1.43\" Ultra-bright AMOLED Display (1,200 nits peak, Always-On)",
            "Titanium Grade 4 Unibody with Ceramic Backplate",
            "Comprehensive Health: Medical ECG, SpO2, Skin Temp, HRV",
            "Dual-Frequency Multi-GNSS Satellite Precision GPS",
            "5ATM + IP68 Water Resistance (Swim-proof up to 50 meters)"
        ],
        "specs": {
            "Display": "1.43\" AMOLED (466 x 466 px, 326 ppi)",
            "Case Material": "Grade 4 Titanium + Sapphire Crystal Glass",
            "Battery Life": "Up to 14 days typical / 38 hours precision GPS",
            "Water Rating": "5 ATM Water Resistance (50m)",
            "Connectivity": "Bluetooth 5.3 Low Energy + NFC Payments",
            "Sensors": "Optical Heart, Bioimpedance, Compass, Barometer",
            "Warranty": "2 Years Manufacturer Warranty"
        },
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Titanium Silver", "Space Black", "Alpine Amber Strap"],
        "tags": ["watch", "wearables", "smartwatch", "fitness", "trending"],
        "is_featured": True,
        "is_flash_sale": True
    },
    {
        "id": "prod_flow_buds",
        "name": "Nexora Flow Buds Pro",
        "slug": "nexora-flow-buds-pro",
        "tagline": "True Wireless Earbuds with Dual Drivers & Adaptive Transparency",
        "category": "Headphones",
        "price": 5499,
        "original_price": 7999,
        "discount": 31,
        "rating": 4.6,
        "review_count": 519,
        "in_stock": True,
        "stock_count": 48,
        "badge": "Popular",
        "description": "Pocket-sized acoustic grandeur. Dual coaxial acoustic drivers produce crisp highs and deep resonance. Featuring 6-mic beamforming with wind reduction, touch pressure stems, and Qi wireless fast-charging case.",
        "features": [
            "Coaxial Dual Drivers: 11mm Dynamic Bass + 6mm Balanced Armature",
            "Personalized Active Noise Cancellation with Transparency Mode",
            "Triple-mic crystal-clear voice clarity with AI de-noising",
            "36-Hour Total Playback with USB-C and Qi Wireless Charging",
            "IP54 Sweat & Splash Resistance for intense workouts"
        ],
        "specs": {
            "Drivers": "11mm Dynamic + 6mm Balanced Armature",
            "ANC Depth": "Up to 45dB intelligent noise reduction",
            "Battery Life": "8.5 hrs earbuds / 36 hrs with charging case",
            "Codecs": "LHDC 5.0, AAC, SBC",
            "Weight": "4.6g per earbud / 42g charging case",
            "Charging": "Qi Wireless + USB-C Quick Charge",
            "Warranty": "1 Year Replacement Guarantee"
        },
        "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Glacier White", "Graphite Black", "Sage Green"],
        "tags": ["audio", "earbuds", "wireless", "tws"],
        "is_featured": True,
        "is_flash_sale": True
    },
    {
        "id": "prod_core_mouse",
        "name": "Nexora Core Wireless Ergonomic Mouse",
        "slug": "nexora-core-wireless-ergonomic-mouse",
        "tagline": "Zero-Fatigue Ergonomic Contour with 26K Optical Precision",
        "category": "Gaming",
        "price": 4299,
        "original_price": 5999,
        "discount": 28,
        "rating": 4.8,
        "review_count": 196,
        "in_stock": True,
        "stock_count": 30,
        "badge": "Staff Pick",
        "description": "Designed in collaboration with ergonomics researchers to preserve wrist alignment through 10-hour workdays. Equipped with a machined stainless steel MagSpeed scroll wheel, ultra-silent tactile clicks, and smooth sensor tracking on virtually any surface—including glass.",
        "features": [
            "57° Natural Ergo Handshake Angle reducing muscle strain",
            "Machined Aluminum Smartshift Scroll Wheel (Freespin & Ratchet)",
            "PixArt 26,000 DPI Optical Sensor (tracks on glass)",
            "70-Day Battery Life on a single USB-C charge",
            "Connect up to 3 devices with seamless Flow cross-computer control"
        ],
        "specs": {
            "DPI Range": "200 – 26,000 DPI (50 DPI increments)",
            "Buttons": "7 Fully Programmable (Nexora Studio App)",
            "Switch Lifespan": "80 Million Optical Clicks (Whisper Quiet)",
            "Connectivity": "2.4GHz Wireless Dongle + Bluetooth Low Energy",
            "Weight": "112 grams optimized",
            "Battery": "500 mAh Li-Po (Type-C rechargeable)"
        },
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Matte Charcoal", "Silver Mist", "Arctic Off-White"],
        "tags": ["mouse", "ergonomic", "desk", "productivity"],
        "is_featured": False,
        "is_flash_sale": False
    },
    {
        "id": "prod_phantom_4k",
        "name": "Nexora Phantom Ultralight 4K Gaming Mouse",
        "slug": "nexora-phantom-ultralight-4k-gaming-mouse",
        "tagline": "49-Gram Magnesium Alloy Skeleton with True 4000Hz Polling",
        "category": "Gaming",
        "price": 7999,
        "original_price": 9999,
        "discount": 20,
        "rating": 4.9,
        "review_count": 218,
        "in_stock": True,
        "stock_count": 14,
        "badge": "Pro Esports",
        "description": "Forged for competitive apex-tier gaming. At a staggering 49 grams with a high-rigidity magnesium exoskeleton, the Phantom 4K features zero-latency Nordic 52840 MCU, optical switches impervious to double-clicking, and virgin grade 100% PTFE skate feet.",
        "features": [
            "Ultra-light 49 grams Magnesium Alloy structural frame",
            "True 4000Hz Wireless Polling Rate (0.25ms response time)",
            "PAW3395 Optical Sensor (26,000 DPI, 650 IPS, 50G acceleration)",
            "Optical Switch V2 rated for 100 million rapid actuations",
            "Superflex Paracord USB-C charging cable included"
        ],
        "specs": {
            "Weight": "49g ± 1.5g",
            "Polling Rate": "1000Hz / 2000Hz / 4000Hz selectable",
            "Sensor": "PixArt PAW3395 Flawless",
            "Battery Life": "Up to 80 hrs at 1000Hz / 36 hrs at 4000Hz",
            "Feet": "100% Pure Virgin-Grade PTFE rounded edges"
        },
        "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Raw Gunmetal", "Frost White"],
        "tags": ["mouse", "gaming", "esports", "wireless"],
        "is_featured": True,
        "is_flash_sale": False
    },
    {
        "id": "prod_dock_pro",
        "name": "Nexora Dock Pro 14-in-1 Thunderbolt 4",
        "slug": "nexora-dock-pro-14-in-1-thunderbolt-4",
        "tagline": "40Gbps Dual 4K@120Hz Workstation Hub with 96W Power Delivery",
        "category": "Desk Setup",
        "price": 12999,
        "original_price": 16999,
        "discount": 24,
        "rating": 4.9,
        "review_count": 164,
        "in_stock": True,
        "stock_count": 16,
        "badge": "Pro Studio",
        "description": "Transform any modern MacBook, Windows, or Linux laptop into a monolithic command workstation with a single cable. Features Intel Thunderbolt 4 certified controller, 2x HDMI 2.1, 2x DisplayPort 1.4, 2.5Gbps Gigabit Ethernet, UHS-II SD card readers, and 96W upstream charging.",
        "features": [
            "Intel Thunderbolt 4 certified 40Gbps high-bandwidth link",
            "Simultaneous Dual 4K@120Hz or Single 8K@60Hz display support",
            "96W Smart Dynamic Host Charging keeps demanding laptops full",
            "2.5Gbps High-Speed RJ45 LAN for multi-gigabit fiber networks",
            "Solid extruded aluminum body with passive cooling ribs"
        ],
        "specs": {
            "Ports": "14 Total (3x TB4, 2x HDMI 2.1, 2x DP 1.4, 4x USB-A 3.2, 2.5G LAN, SD/TF, 3.5mm)",
            "Host Power": "96W continuous USB Power Delivery 3.0",
            "Dimensions": "200 x 75 x 25 mm",
            "Chassis": "Anodized Aerospace Aluminum Alloy",
            "Compatibility": "Apple M1/M2/M3/M4 Macs, Windows 11 TB4/USB4 laptops"
        },
        "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Space Gray", "Silver"],
        "tags": ["dock", "thunderbolt", "desk", "accessories", "trending"],
        "is_featured": True,
        "is_flash_sale": False
    },
    {
        "id": "prod_wave_mini",
        "name": "Nexora Wave Mini 360 Portable Speaker",
        "slug": "nexora-wave-mini-360-portable-speaker",
        "tagline": "Omnidirectional Room-Filling Sound with Deep Bass Radiator",
        "category": "Accessories",
        "price": 3499,
        "original_price": 4999,
        "discount": 30,
        "rating": 4.7,
        "review_count": 389,
        "in_stock": True,
        "stock_count": 55,
        "badge": "Bestseller",
        "description": "Compact enough to toss into any daypack, yet capable of surprisingly warm low-end and crystal clarity. Encased in acoustic ballistic fabric with an IP67 waterproof and dustproof shell, the Wave Mini provides 18 hours of musical companionship.",
        "features": [
            "360° Omnidirectional Soundstage with dual passive radiators",
            "IP67 Rugged Waterproof & Dustproof (floats in water)",
            "18-Hour All-Day Playback on a single 2-hour charge",
            "True Wireless Stereo (TWS) Pairing for dual-speaker stereo",
            "Integrated braided paracord carry strap"
        ],
        "specs": {
            "Power Output": "16W Peak RMS",
            "Frequency": "65 Hz – 20,000 Hz",
            "Bluetooth": "5.3 with 30-meter wireless reach",
            "Battery": "3,200 mAh (18 hrs at 65% volume)",
            "Dimensions": "95 x 95 x 115 mm",
            "Weight": "385 grams"
        },
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Storm Gray", "Forest Olive", "Sunset Terracotta"],
        "tags": ["speaker", "audio", "bluetooth", "portable"],
        "is_featured": False,
        "is_flash_sale": True
    },
    {
        "id": "prod_volt_100w",
        "name": "Nexora Volt 100W GaN Fast Charger",
        "slug": "nexora-volt-100w-gan-fast-charger",
        "tagline": "Ultra-Compact 4-Port Gallium Nitride Charger with Foldable Prongs",
        "category": "Accessories",
        "price": 2999,
        "original_price": 4499,
        "discount": 33,
        "rating": 4.8,
        "review_count": 470,
        "in_stock": True,
        "stock_count": 60,
        "badge": "Essential",
        "description": "Harnessing 4th-generation Gallium Nitride (GaN III) semiconductors, the Volt 100W charges a 16\" MacBook Pro, iPad Pro, and iPhone simultaneously while occupying 40% less volume than standard single-port chargers.",
        "features": [
            "100W Max Single-Port Output (PD 3.0, PPS, QC 4.0+)",
            "4 Simultaneous Ports: 3x USB-C + 1x USB-A",
            "Dynamic Power Allocation: Intelligently distributes wattage",
            "Nexora ThermalShield 2.0 active temperature monitoring 80x/sec",
            "Foldable travel pins with international travel compatibility"
        ],
        "specs": {
            "Total Wattage": "100W Maximum",
            "Input": "100-240V ~ 50/60Hz 2.0A",
            "Ports": "USB-C1/C2 (100W max), USB-C3 (30W max), USB-A (22.5W max)",
            "Dimensions": "65 x 65 x 32 mm",
            "Weight": "195 grams"
        },
        "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Matte Black", "Pure White"],
        "tags": ["charger", "gan", "power", "accessories"],
        "is_featured": False,
        "is_flash_sale": True
    },
    {
        "id": "prod_powermax_25k",
        "name": "Nexora PowerMax 25000mAh Power Bank",
        "slug": "nexora-powermax-25000mah-power-bank",
        "tagline": "Airline-Safe 145W Fast Laptop Battery with Smart TFT Display",
        "category": "Accessories",
        "price": 6499,
        "original_price": 8999,
        "discount": 28,
        "rating": 4.9,
        "review_count": 341,
        "in_stock": True,
        "stock_count": 28,
        "badge": "High Demand",
        "description": "Never hunt for an airport outlet again. Delivering 145W combined bi-directional rapid charging, this flight-approved 99.6Wh lithium power pack features an interactive IPS full-color telemetry screen showing real-time watts, battery health, and time-to-full.",
        "features": [
            "Flight-Approved 99.6Wh Capacity (25,000mAh at 3.7V)",
            "100W USB-C PD Input/Output + 45W secondary USB-C",
            "Color Smart Display: Live wattage, volts, temperatures, and ETA",
            "Pass-through charging support while powering external devices",
            "Heavy-duty fire-retardant aluminum alloy housing"
        ],
        "specs": {
            "Capacity": "25,000 mAh (99.6 Wh TSA Compliant)",
            "Max Output": "145W Total (100W Port 1 + 45W Port 2)",
            "Recharge Time": "65 minutes (using 100W wall adapter)",
            "Weight": "495 grams",
            "Display": "1.3\" High-Contrast Color TFT Screen"
        },
        "image": "https://images.unsplash.com/photo-1609592426508-410a62319ec8?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1609592426508-410a62319ec8?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Titanium Slate", "Deep Carbon"],
        "tags": ["battery", "powerbank", "travel", "laptop"],
        "is_featured": True,
        "is_flash_sale": False
    },
    {
        "id": "prod_magcharge_dual",
        "name": "Nexora MagCharge 3-in-1 Wireless Stand",
        "slug": "nexora-magcharge-3-in-1-wireless-stand",
        "tagline": "Solid Billet Zinc Alloy Stand for Phone, Watch, and Earbuds",
        "category": "Desk Setup",
        "price": 4999,
        "original_price": 6999,
        "discount": 29,
        "rating": 4.8,
        "review_count": 240,
        "in_stock": True,
        "stock_count": 25,
        "badge": "Desk Icon",
        "description": "Streamline bedside clutter and desktop cable sprawl. Built from weighted zinc alloy with strong N52 neodymium magnets, providing simultaneous 15W Qi2 fast magnetic charging for smartphones, fast-charge puck for smartwatches, and a grooved wireless base for earbuds.",
        "features": [
            "Official Qi2 15W Fast Magnetic Wireless Alignment",
            "Simultaneous charging for Phone (15W), Watch (5W), and Buds (5W)",
            "Heavy 480g anti-tip weighted base with micro-suction silicone foot",
            "Adjustable 45-degree tilt angle for FaceTime & StandBy mode",
            "Braided 1.5m USB-C cable included"
        ],
        "specs": {
            "Materials": "CNC Machined Zinc Alloy + Soft Silicone Faceplate",
            "Total Power": "25W max combined",
            "Safety": "Foreign Object Detection, Over-voltage, Over-temp cutoff",
            "Weight": "480 grams (one-hand detach capable)",
            "Dimensions": "140 x 95 x 115 mm"
        },
        "image": "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Matte Silver", "Space Black"],
        "tags": ["wireless", "charger", "magsafe", "desk"],
        "is_featured": False,
        "is_flash_sale": False
    },
    {
        "id": "prod_prism_screenbar",
        "name": "Nexora Prism Monitor ScreenBar Halo",
        "slug": "nexora-prism-monitor-screenbar-halo",
        "tagline": "Asymmetric Optical Desk Lamp with Wireless Rotary Dial",
        "category": "Desk Setup",
        "price": 5999,
        "original_price": 7999,
        "discount": 25,
        "rating": 4.9,
        "review_count": 182,
        "in_stock": True,
        "stock_count": 20,
        "badge": "Staff Pick",
        "description": "Eliminate screen glare and eye strain forever. The Prism features an asymmetric optical design that illuminates strictly your desk space without washing out your display. Features a wireless precision desktop puck dial to modulate color temperature (2700K – 6500K) and brightness.",
        "features": [
            "Zero Screen Reflection with precision asymmetric light optics",
            "Wireless 2.4GHz Desktop Rotary Controller Dial",
            "Dual Light Source: Front desk glow + Rear ambient halo wall wash",
            "High Color Rendering Index: Ra > 95 for natural true color",
            "Auto-Dimming ambient light sensor built into the light bar"
        ],
        "specs": {
            "Color Temp": "2700K (Warm Candle) – 6500K (Daylight Cool)",
            "Max Illuminance": "1000 Lux center brightness",
            "Monitor Fit": "Compatible with 0.5cm – 4.5cm flat and curved screens",
            "Power": "USB-C 5V/2A powered directly from monitor or hub",
            "Dimensions": "450 mm bar length"
        },
        "image": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Anodized Dark Bronze", "Space Black"],
        "tags": ["lighting", "desk", "productivity", "eyecare"],
        "is_featured": True,
        "is_flash_sale": False
    },
    {
        "id": "prod_aero_stand",
        "name": "Nexora Aero Aluminum Laptop Stand",
        "slug": "nexora-aero-aluminum-laptop-stand",
        "tagline": "Ergonomic Foldable Billet Aluminum Elevator for 11\"-17\" Laptops",
        "category": "Desk Setup",
        "price": 2499,
        "original_price": 3499,
        "discount": 29,
        "rating": 4.8,
        "review_count": 298,
        "in_stock": True,
        "stock_count": 42,
        "badge": "Popular",
        "description": "Raise your laptop display to eye level, relieving neck and shoulder tension. Precision cut from a single sheet of bead-blasted aluminum, promoting natural passive thermal airflow to keep your processor running cool under heavy compilation and render loads.",
        "features": [
            "Elevates screen by 6 inches to correct cervical spine posture",
            "Open-air ventilation design maximizes heat dissipation",
            "Non-slip silicone contact pads protect laptop finish from scratches",
            "Cable routing pass-through keeps your workspace pristine",
            "Supports all laptops up to 17 inches and up to 6 kg load"
        ],
        "specs": {
            "Material": "Sandblasted & Anodized Aluminum 6000-series",
            "Compatibility": "11\" to 17.3\" laptops (MacBook, ThinkPad, Dell XPS, etc.)",
            "Weight": "860 grams",
            "Elevation Height": "15 cm (fixed ergonomic angle)"
        },
        "image": "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Silver", "Space Gray"],
        "tags": ["stand", "laptop", "ergonomic", "desk"],
        "is_featured": False,
        "is_flash_sale": True
    },
    {
        "id": "prod_desk_mat",
        "name": "Nexora Merino Wool & Leather Desk Mat",
        "slug": "nexora-merino-wool-leather-desk-mat",
        "tagline": "Large Dual-Tone 90x40cm Desk Pad with Magnetic Cable Channel",
        "category": "Desk Setup",
        "price": 1999,
        "original_price": 2799,
        "discount": 29,
        "rating": 4.9,
        "review_count": 415,
        "in_stock": True,
        "stock_count": 50,
        "badge": "Top Rated",
        "description": "The tactile foundation of an elevated workspace. Crafted with water-resistant vegan top-grain saddle leather layered above 3mm cushioning acoustic felt. Features an embedded magnetic toolbar rail to neatly snap charging cords and styluses into place.",
        "features": [
            "90cm x 40cm spacious coverage for keyboard, mouse, and coffee",
            "Dual-sided reversible use: Smooth leather side or warm acoustic felt",
            "Spill-resistant and scratch-proof hydrophobic coating",
            "Embedded magnetic cable organizer channel included",
            "Precision perimeter anti-fray hand stitching"
        ],
        "specs": {
            "Dimensions": "900 x 400 x 4 mm",
            "Material": "Premium Vegan Polyurethane Leather + High-Density Merino Felt",
            "Care": "Wipe clean with a damp microfiber cloth",
            "Weight": "520 grams"
        },
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Caramel Brown & Charcoal", "Jet Black & Stone Gray", "Navy & Ash"],
        "tags": ["desk", "mat", "accessories", "leather"],
        "is_featured": False,
        "is_flash_sale": False
    },
    {
        "id": "prod_soundcore_stage",
        "name": "Nexora SoundCore Stage Room Speaker",
        "slug": "nexora-soundcore-stage-room-speaker",
        "tagline": "High-Fidelity 80W Walnut Wood Bluetooth 5.3 Home Speaker",
        "category": "Headphones",
        "price": 16999,
        "original_price": 21999,
        "discount": 23,
        "rating": 4.9,
        "review_count": 142,
        "in_stock": True,
        "stock_count": 12,
        "badge": "Audiophile",
        "description": "An acoustic work of art. Featuring an acoustically neutral solid American walnut enclosure, custom silk-dome tweeters, dual 4-inch Kevlar woofers, and analog rotary brass tone dials for bass and treble control.",
        "features": [
            "80W RMS Bi-amplified Class-D audio engine",
            "Genuine Solid Walnut Wood Cabinet for natural warm acoustics",
            "High-Resolution Audio certified with aptX HD & LDAC lossless",
            "Tactile Brass Knobs: Volume, Bass, Treble, and Source Select",
            "Inputs: Bluetooth 5.3, Optical TOSLINK, RCA, and USB DAC"
        ],
        "specs": {
            "Power Output": "80W RMS (Peak 120W)",
            "Frequency Response": "40 Hz – 22,000 Hz",
            "Cabinet": "Acoustic Walnut Hardwood + Brass Knurled Dials",
            "Weight": "4.8 kg",
            "Inputs": "Bluetooth 5.3, Optical, 3.5mm Aux, RCA Stereo"
        },
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Natural Walnut", "Piano Gloss Black"],
        "tags": ["speaker", "audiophile", "hifi", "wood"],
        "is_featured": True,
        "is_flash_sale": False
    },
    {
        "id": "prod_cybercraft_65",
        "name": "Nexora CyberCraft 65% Wireless Keyboard",
        "slug": "nexora-cybercraft-65-wireless-keyboard",
        "tagline": "Transparent Polycarbonate Body with RGB Underglow & South-facing LEDs",
        "category": "Keyboards",
        "price": 7499,
        "original_price": 9999,
        "discount": 25,
        "rating": 4.7,
        "review_count": 178,
        "in_stock": True,
        "stock_count": 19,
        "badge": "New Arrival",
        "description": "Futuristic retro-cyberpunk aesthetics meeting acoustic perfection. The fully crystal-clear polycarbonate housing showcases factory-lubricated linear Jelly Pink switches with silicon dampening pads for a deep, satisfying 'thock' sound profile.",
        "features": [
            "Crystal Polycarbonate transparent frame and keycaps",
            "Pre-lubed Nexora Jelly Pink Linear Switches (42g light actuation)",
            "Gasket-mounted sound-absorbing internal silicone dampener",
            "Full South-Facing per-key RGB lighting with 22 dynamic animations",
            "3,000 mAh battery supporting up to 120 hours of wireless use"
        ],
        "specs": {
            "Layout": "65% Compact (68 keys including dedicated arrow keys)",
            "Switch Type": "Hot-swappable 3/5-pin linear switches",
            "Connectivity": "Tri-Mode (Bluetooth 5.1 / 2.4G / Type-C)",
            "Weight": "820 grams",
            "Warranty": "2 Years Official Warranty"
        },
        "image": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Clear Ice", "Smoke Black Crystal"],
        "tags": ["keyboard", "rgb", "transparent", "custom"],
        "is_featured": False,
        "is_flash_sale": True
    },
    {
        "id": "prod_orbit_band",
        "name": "Nexora Orbit Fitness Tracker Pro",
        "slug": "nexora-orbit-fitness-tracker-pro",
        "tagline": "Featherlight 18g Tracker with 24/7 Sleep Stage Analysis",
        "category": "Wearables",
        "price": 3999,
        "original_price": 5499,
        "discount": 27,
        "rating": 4.6,
        "review_count": 310,
        "in_stock": True,
        "stock_count": 40,
        "badge": "Great Value",
        "description": "Designed to disappear on your wrist while keeping vigil over your recovery. Tracks 110+ sports modes, REM sleep stages, daily stress levels, and menstrual cycles with a vibrant curved AMOLED touch display and 16-day battery endurance.",
        "features": [
            "1.1\" Curved AMOLED full color touch display",
            "Ultra-lightweight 18g waterproof body with silicone sports strap",
            "Advanced sleep stages scoring (Deep, Light, REM, Awakenings)",
            "Continuous 24h blood oxygen saturation and heart health alerts",
            "Magnetic snap charger with 16-day battery life"
        ],
        "specs": {
            "Display": "1.1\" Curved AMOLED (126 x 294)",
            "Water Rating": "5 ATM Water Resistance (50m swimming)",
            "Battery Life": "Up to 16 days typical / 10 days heavy use",
            "Weight": "18.5g (without strap)"
        },
        "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Midnight Matte", "Rose Dawn", "Ocean Teal"],
        "tags": ["fitness", "tracker", "wearable", "health"],
        "is_featured": False,
        "is_flash_sale": False
    },
    {
        "id": "prod_hub_8in1",
        "name": "Nexora Slim 8-in-1 Travel USB-C Hub",
        "slug": "nexora-slim-8-in-1-travel-usb-c-hub",
        "tagline": "Braided Cable 4K@60Hz HDMI with 100W PD Pass-through",
        "category": "Accessories",
        "price": 2499,
        "original_price": 3499,
        "discount": 29,
        "rating": 4.7,
        "review_count": 360,
        "in_stock": True,
        "stock_count": 52,
        "badge": "Travel Pick",
        "description": "Slim as a fountain pen, ready for any conference room or hotel workspace. Features butter-smooth 4K@60Hz HDMI video out, 100W Power Delivery, Gigabit Ethernet, 3x USB 3.0 ports, and high-speed SD/TF card slots wrapped in heat-dissipating aerospace alloy.",
        "features": [
            "Smooth 4K@60Hz HDMI monitor output for lag-free presentations",
            "100W USB-C Power Delivery charging pass-through",
            "1000Mbps Gigabit Ethernet port for stable wired LAN",
            "Ultra-compact 12mm thin pocketable profile",
            "Reinforced Kevlar braided cable resists 10,000+ bends"
        ],
        "specs": {
            "Ports": "1x HDMI (4K@60Hz), 1x 100W PD, 1x RJ45 Gigabit, 3x USB-A 3.0, 1x SD, 1x TF",
            "Transfer Speeds": "Up to 5Gbps data transfer",
            "Material": "Sandblasted Aluminum Alloy",
            "Weight": "72 grams"
        },
        "image": "https://images.unsplash.com/photo-1625948515291-696130d46b99?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1625948515291-696130d46b99?auto=format&fit=crop&w=1000&q=80"
        ],
        "colors": ["Space Gray", "Silver"],
        "tags": ["hub", "usbc", "accessories", "travel"],
        "is_featured": False,
        "is_flash_sale": True
    }
]

CATEGORIES = [
    {
        "id": "cat_headphones",
        "name": "Headphones",
        "slug": "headphones",
        "item_count": 4,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        "description": "Studio-grade ANC headphones & dual-driver wireless earbuds"
    },
    {
        "id": "cat_keyboards",
        "name": "Keyboards",
        "slug": "keyboards",
        "item_count": 3,
        "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        "description": "CNC aluminum gasket mechanical keyboards and custom boards"
    },
    {
        "id": "cat_wearables",
        "name": "Wearables",
        "slug": "wearables",
        "item_count": 2,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        "description": "Titanium sapphire smartwatches & biometric recovery trackers"
    },
    {
        "id": "cat_gaming",
        "name": "Gaming",
        "slug": "gaming",
        "item_count": 2,
        "image": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
        "description": "Sub-50g magnesium 4K wireless mice & esports precision gear"
    },
    {
        "id": "cat_desk_setup",
        "name": "Desk Setup",
        "slug": "desk-setup",
        "item_count": 5,
        "image": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=600&q=80",
        "description": "Thunderbolt docks, screenbars, magnetic stands, and desk pads"
    },
    {
        "id": "cat_accessories",
        "name": "Accessories",
        "slug": "accessories",
        "item_count": 4,
        "image": "https://images.unsplash.com/photo-1609592426508-410a62319ec8?auto=format&fit=crop&w=600&q=80",
        "description": "GaN chargers, airline-safe laptop batteries, and travel hubs"
    }
]
