/**
 * Classe para gerenciar missões
 */
class Mission {
    constructor(id, title, description, objective, reward) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.objective = objective; // Meta (ex: 10 inimigos)
        this.progress = 0;
        this.completed = false;
        this.reward = reward; // Pontos de recompensa
    }

    updateProgress(amount) {
        this.progress += amount;
        if (this.progress >= this.objective) {
            this.progress = this.objective;
            this.completed = true;
        }
    }

    reset() {
        this.progress = 0;
        this.completed = false;
    }

    isCompleted() {
        return this.completed;
    }

    getProgressPercent() {
        return (this.progress / this.objective) * 100;
    }
}

/**
 * Classe para gerenciar sistema de missões
 */
class MissionManager {
    constructor() {
        this.missions = [];
        this.currentMission = 0;
        this.initializeMissions();
    }

    initializeMissions() {
        this.missions = [
            new Mission(1, 'Primeiro Contato', 'Elimine 10 inimigos', 10, 500),
            new Mission(2, 'Limpeza de Zona', 'Elimine 25 inimigos', 25, 1000),
            new Mission(3, 'Eliminador', 'Elimine 50 inimigos', 50, 2500),
            new Mission(4, 'Sobreviva por 2 minutos', 'Sobreviva 120 segundos', 120, 1500),
            new Mission(5, 'Destruidor', 'Elimine inimigos tipo Elite', 5, 2000),
        ];
    }

    getCurrentMission() {
        return this.missions[this.currentMission];
    }

    updateProgress(amount) {
        const mission = this.getCurrentMission();
        if (mission && !mission.isCompleted()) {
            mission.updateProgress(amount);
        }
    }

    nextMission() {
        if (this.currentMission < this.missions.length - 1) {
            this.currentMission++;
            return true;
        }
        return false;
    }

    resetCurrentMission() {
        const mission = this.getCurrentMission();
        if (mission) {
            mission.reset();
        }
    }

    getMissionInfo() {
        const mission = this.getCurrentMission();
        if (!mission) return null;

        return {
            title: mission.title,
            description: mission.description,
            progress: mission.progress,
            objective: mission.objective,
            percent: mission.getProgressPercent(),
            completed: mission.completed,
            reward: mission.reward
        };
    }

    isCurrentMissionCompleted() {
        const mission = this.getCurrentMission();
        return mission ? mission.isCompleted() : false;
    }

    getTotalMissions() {
        return this.missions.length;
    }

    getCurrentMissionIndex() {
        return this.currentMission;
    }
}

/**
 * Sistema de ondas de inimigos
 */
class WaveSystem {
    constructor() {
        this.currentWave = 1;
        this.waveTimer = 0;
        this.waveDuration = 300; // 5 segundos em frames (60fps)
        this.waveInterval = 600; // Intervalo entre ondas
    }

    update() {
        this.waveTimer++;
    }

    shouldSpawnWave() {
        return this.waveTimer >= this.waveInterval;
    }

    nextWave() {
        this.currentWave++;
        this.waveTimer = 0;
        return this.currentWave;
    }

    getCurrentWave() {
        return this.currentWave;
    }

    getDifficulty() {
        return 1 + (this.currentWave * 0.1);
    }

    reset() {
        this.currentWave = 1;
        this.waveTimer = 0;
    }
}

/**
 * Sistema de pontuação
 */
class ScoreSystem {
    constructor() {
        this.score = 0;
        this.killCount = 0;
        this.comboKills = 0;
        this.comboTimer = 0;
        this.comboMultiplier = 1;
        this.comboThreshold = 60; // Frames para quebrar combo
    }

    addKill(enemyType, comboBonus = false) {
        this.killCount++;

        let points = 0;
        switch (enemyType) {
            case 'basic':
                points = 100;
                break;
            case 'shooter':
                points = 200;
                break;
            case 'elite':
                points = 500;
                break;
            case 'boss':
                points = 1000;
                break;
        }

        // Aplicar multiplicador de combo
        points = Math.floor(points * this.comboMultiplier);

        this.score += points;
        this.increaseCombo();

        return points;
    }

    increaseCombo() {
        this.comboKills++;
        this.comboTimer = this.comboThreshold;

        // Aumentar multiplicador a cada 5 kills
        if (this.comboKills % 5 === 0) {
            this.comboMultiplier = Math.min(this.comboMultiplier + 0.2, 3);
        }
    }

    update() {
        this.comboTimer--;
        if (this.comboTimer <= 0) {
            this.resetCombo();
        }
    }

    resetCombo() {
        this.comboKills = 0;
        this.comboMultiplier = 1;
        this.comboTimer = 0;
    }

    getScore() {
        return this.score;
    }

    getComboInfo() {
        return {
            kills: this.comboKills,
            multiplier: this.comboMultiplier.toFixed(1),
            active: this.comboKills > 0
        };
    }

    reset() {
        this.score = 0;
        this.killCount = 0;
        this.resetCombo();
    }
}
