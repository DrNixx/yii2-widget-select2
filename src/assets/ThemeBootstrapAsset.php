<?php
namespace onix\assets;

/**
 * Asset bundle for the bootstrap theme for [[Select2]] widget.
 */
class ThemeBootstrapAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->setSourcePath(dirname(dirname(__DIR__)) . '/assets');
        $this->setupAssets('css', ['css/select2-bootstrap']);
        parent::init();
    }
}
